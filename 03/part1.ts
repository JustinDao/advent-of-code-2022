import fs from 'fs'

const file = fs.readFileSync('./03/input.txt').toString()
const lines = file.split('\n')

const getPriority = (letter: string): number => {
  const charVal = letter.charCodeAt(0)
  if (charVal >= 97) {
      return charVal - 96
  }

  return charVal - 64 + 26
}

let total = 0
for (const line of lines) {
  const trimmedLine = line.trim()
  const half = Math.ceil(trimmedLine.length / 2)
  const firstHalf = trimmedLine.slice(0, half).split('')
  
  const lettersInFirst = new Set(firstHalf)
  const secondHalf = trimmedLine.slice(half).split('')

  for (const letter of secondHalf) {
    if (lettersInFirst.has(letter)) {
      total += getPriority(letter)
      break
    }
  }
}

console.log(total)
