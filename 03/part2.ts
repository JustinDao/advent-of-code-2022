import fs from 'fs'
import _ from 'lodash'

const file = fs.readFileSync('./03/input.txt').toString()
const lines = file.split('\n')

const getPriority = (letter: string): number => {
  const charVal = letter.charCodeAt(0)
  if (charVal >= 97) {
      return charVal - 96
  }

  return charVal - 64 + 26
}

const getIntersection = (setA: Set<string>, setB: Set<string>): Set<string> => {
  const intersection = new Set(
    [...setA].filter(element => setB.has(element))
  )

  return intersection
}

const groups = _.chunk(lines, 3)

let total = 0
for (const group of groups) {
  const [line1, line2, line3] = group.map(l => l.trim())
  const lettersInFirst = new Set(line1.split(''))
  const lettersInSecond = new Set(line2.split(''))
  const lettersInThird = new Set(line3.split(''))

  const common = getIntersection(getIntersection(lettersInFirst, lettersInSecond), lettersInThird)

  const match = common.keys().next().value as string
  total += getPriority(match)
}

console.log(total)
