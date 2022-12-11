import fs from 'fs'

const file = fs.readFileSync('./04/input.txt').toString()
const lines = file.split('\n')

let total = 0
for (const line of lines) {
  const [firstMin, firstMax, secondMin, secondMax] = line.split(',').flatMap(elf => elf.split('-').map(Number))
  const isFullyContained = firstMin <= secondMin && firstMax >= secondMax || firstMin >= secondMin && firstMax <= secondMax
  console.log(firstMin, firstMax, secondMin, secondMax, isFullyContained)

  if (isFullyContained) {
    total += 1   
  }
}

console.log(total)