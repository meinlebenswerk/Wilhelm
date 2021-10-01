import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import nodemailer from 'nodemailer'
import { SHA256 } from 'crypto-js'
import { nanoid } from 'nanoid'

import { Low, JSONFile } from 'lowdb'

import axios from 'axios'
import cssInliner from 'inline-css'
import { unvariableCSS } from './inliner'
import { UserID, User, UserCreationInfo, UserTAN, ArtGrid, GridSize, ArtGridElement } from '~/types/API'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Mail transporter:
const transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp.1und1.de',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const gridSize: GridSize = {
  x: parseInt(process.env.GRID_SIZE_X ?? '') ?? 1,
  y: parseInt(process.env.GRID_SIZE_Y ?? '') ?? 1
}

let emailServiceOnline = false
transporter.verify(function (error) {
  if (error) {
    emailServiceOnline = false
  } else {
    emailServiceOnline = true
  }
})

const generateTAN = (info: UserCreationInfo) => {
  const { firstname, lastname, email } = info

  const str = `${firstname.trim()}${lastname.trim()}${email.trim()}`.toLowerCase()
  const hash = SHA256(str).toString()

  // get the first idk 8 chars?
  return { tan: hash.slice(0, 8), token: hash }
}

const generateEmailHtml = async (html: string): Promise<string> => {
  const processedHTML = html
    .replace(/(@import\s*url\([^)]+\);)/g, (match) => {
      return match.replace(/(@import\s*url\()([^)]+)(\);)/, (_, __, url) => `@import "${url}";`)
    })

  const unvariabledHTML = unvariableCSS(processedHTML)

  return await cssInliner(unvariabledHTML, { url: 'heinrich.app' })
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXYZ'
const initArtGrid = (size: GridSize): ArtGrid => {
  const data: ArtGridElement[][] = []
  for (let x = 0; x < size.x; x++) {
    data.push(new Array(size.y).fill(null).map((_, y) => {
      return {
        comment: '',
        owner: null,
        coordinates: `${alphabet[x]}${y + 1}`,
        ownedAt: null,
        lastUpdated: null
      }
    }))
  }

  return {
    size,
    data
  }
}

type DBData = {
  users: {
    [key: string]: User | undefined
  }
  tokenUserIdMap: {
    [key: string]: UserID | undefined
  }
  artgrid: ArtGrid
}
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile<DBData>(file)
const db = new Low<DBData>(adapter)

// Init DB
let dbInitialized = false
db.read().then(() => {
  dbInitialized = true
  db.data = {
    users: {},
    tokenUserIdMap: {},
    artgrid: initArtGrid(gridSize),
    ...db.data
  }
  db.write()
})

app.get('/status', function (_, res) {
  res.send({ ok: emailServiceOnline && dbInitialized })
})

// Users helpers:
const getUserByTAN = (tan: string): User | null => {
  if (!db.data) { return null }

  const userId = db.data.tokenUserIdMap[tan]
  if (!userId) { return null }

  const user = db.data.users[userId]

  return user ?? null
}

// Users Routes
app.post('/users/create', async function (req, res) {
  if (!db.data) {
    res.status(500).send('DB not initialized')
    return
  }

  const { firstname, lastname, email, phone } = req.body

  // check if all parameters are present:
  if (!firstname || !lastname || !email) {
    res.sendStatus(400)
    return
  }

  const { tan, token } = generateTAN(req.body)

  const user = getUserByTAN(tan) ?? {
    id: nanoid(),
    firstname,
    lastname,
    phone,
    email,
    token,
    tan
  }
  const name = `${firstname} ${lastname}`

  const url = `${req.protocol}://${req.get('host')}/tan?name=${name}&tan=${tan}`
  const { data: html } = (await axios.get(url))

  // commit to database
  db.data.users[user.id] = user
  db.data.tokenUserIdMap[tan] = user.id
  await db.write()

  // generate correct HTML:
  const inlinedHTML = await generateEmailHtml(html)

  // send the email:
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `${tan} - Deine Wilhelm TAN`,
    html: inlinedHTML
  })

  res.send('success')
})

app.get('/users/:id', function (req, res) {
  if (!db.data) {
    res.status(500).send('DB not initialized')
    return
  }
  const id = req.params.id

  const user = db.data.users[id]
  if (!user) {
    res.status(404).send(`User with id:${id} not found.`)
    return
  }

  const { firstname, lastname } = user

  const response: User = {
    id,
    firstname,
    lastname
  }

  res.send(response)
})

app.post('/users/login', function (req, res) {
  if (!db.data) {
    res.status(500).send('DB not initialized')
    return
  }
  const { tan } = req.body as { tan: UserTAN }

  const userID = db.data.tokenUserIdMap[tan]
  if (!userID) {
    res.status(404).send(`Unknown TAN ${tan}`)
    return
  }
  const user = db.data.users[userID]
  if (!user) {
    res.status(404).send(`Unknown TAN ${tan}`)
    return
  }

  res.send(user)
})

// Art-App helpers:
const userHasGridlet = (user: User): boolean => {
  if (!db.data) { return true }
  const { data } = db.data.artgrid
  return !!data.flat().find(e => e.owner?.id === user.id)
}

// Art-App Routes
app.get('/art/board', function (_, res) {
  if (!db.data) {
    res.status(500).send('DB not initialized')
    return
  }
  res.send(db.data.artgrid)
})

app.get('/art/status/:tan', function (req, res) {
  const { tan } = req.params

  const user = getUserByTAN(tan)
  if (!user) {
    res.status(400).send('Invalid User')
    return
  }

  res.send({
    ownsGridlet: userHasGridlet(user)
  })
})

app.get('/art/board/:coordinates', function (req, res) {
  if (!db.data) {
    res.status(500).send('DB not initialized')
    return
  }
  const coordinates = req.params.coordinates
  const parts = coordinates.split('')
  const x = alphabet.split('').indexOf(parts[0])
  const y = parseInt(parts[1]) - 1
  res.send(db.data.artgrid.data[x][y])
})

app.post('/art/board/claim', async function (req, res) {
  const { tan, coordinates } = req.body as { tan: string, coordinates: string }
  if (!db.data) {
    res.status(500).send('DB not initialized')
    return
  }
  const parts = coordinates.split('')
  const x = alphabet.split('').indexOf(parts[0])
  const y = parseInt(parts[1]) - 1
  if (db.data.artgrid.data[x][y].owner) {
    res.status(404).send('Already owned')
    return
  }

  // Get the corresponding user:
  const user = getUserByTAN(tan)
  if (!user) {
    res.status(400).send('Invalid User')
    return
  }

  if (userHasGridlet(user)) {
    res.status(400).send('User already owns a gridlet')
    return
  }

  const { id, firstname, lastname } = user
  db.data.artgrid.data[x][y].owner = {
    id,
    firstname,
    lastname
  }
  db.data.artgrid.data[x][y].ownedAt = new Date()
  db.data.artgrid.data[x][y].lastUpdated = new Date()

  await db.write()
  res.send(db.data.artgrid.data[x][y])
})

app.post('/art/board/update', async function (req, res) {
  const { tan, coordinates, comment } = req.body as { tan: string, coordinates: string, comment: string }
  if (!db.data) {
    res.status(500).send('DB not initialized')
    return
  }
  const parts = coordinates.split('')
  const x = alphabet.split('').indexOf(parts[0])
  const y = parseInt(parts[1]) - 1

  const user = getUserByTAN(tan)
  if (!user) {
    res.status(400).send('Invalid User')
    return
  }

  // Check the owner:
  if (user.id !== db.data.artgrid.data[x][y].owner?.id) {
    res.status(400).send('Not owned')
    return
  }

  db.data.artgrid.data[x][y].lastUpdated = new Date()
  db.data.artgrid.data[x][y].comment = comment

  await db.write()
  res.send(db.data.artgrid.data[x][y])
})

export default {
  path: '/api',
  handler: app
}
