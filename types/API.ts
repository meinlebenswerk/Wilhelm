export type UserID = string
export type UserTAN = string

export type User = {
  id: UserID
  firstname: string
  lastname: string
  email?: string
  phone?: string
  token?: string
  tan?: UserTAN
}

export type UserCreationInfo = {
  firstname: string
  lastname: string
  email: string
  phone: string
}

// ART

export type GridSize = {
  x: number,
  y: number
}

export type ArtGridElement = {
  owner: User | null
  comment: string
  coordinates: string
  ownedAt: Date | null
  lastUpdated: Date | null
}

export type ArtGrid = {
  size: GridSize
  data: ArtGridElement[][]
}
