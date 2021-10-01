type CSSVariable = {
  name: string
  value: string
}

const getValue = (name: string, assignments: string[]) => {
  const n = assignments.length - 1
  const assignment = assignments[n]
  const assignmentRegex = new RegExp(`(?:${name}:\\s*)(?<value>[^;]+)(?:;)`, 'g')

  const match = assignmentRegex.exec(assignment)
  if (!match?.groups || !match.groups.value) { return '' }
  return match.groups.value
}

const findAllCSSVars = (str: string): CSSVariable[] => {
  // const formattedString = str
  //   .replace(/\/\*([\s\S]*?)\*\//gm, '') // remove Comments

  const variableNameRegex = /(--[^:\)\<\>]+)(?=:)/g
  const variables = [...new Set([...str.match(variableNameRegex) ?? []])]

  // get the corresponding value:
  return variables.map((name) => {
    const assignmentRegex = new RegExp(`(?:${name}:\\s*)([^;]+)(?:;)`, 'g')
    const assignments = str.match(assignmentRegex) ?? []

    return {
      name,
      value: getValue(name, assignments)
    }
  })
}

const replaceCSSVariables = (variables: CSSVariable[], str: string) => {
  let modifiedString = str
  for (const { name, value } of variables) {
    const insertionRegex = new RegExp(`var\\(${name}\\)`, 'g')
    // console.log(insertionRegex)
    modifiedString = modifiedString.replace(insertionRegex, value)
  }

  return modifiedString
}

const removeCSSVariables = (variables: CSSVariable[], str: string) => {
  let modifiedString = str
  for (const { name } of variables) {
    const removalRegex = new RegExp(`${name}:\\s*[^;]+;`, 'g')
    modifiedString = modifiedString.replace(removalRegex, '')
  }

  return modifiedString
}

export const unvariableCSS = (data: string): string => {
  const CSSVariables = findAllCSSVars(data)
  let modified = replaceCSSVariables(CSSVariables, data)
  modified = replaceCSSVariables(CSSVariables, modified)
  modified = removeCSSVariables(CSSVariables, modified)

  return modified
}
