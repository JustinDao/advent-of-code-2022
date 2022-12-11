import fs from 'fs'

const file = fs.readFileSync('./01/input.txt').toString()
const lines = file.split('\n')

const totals = []

let total = 0
let max = 0

for (const line of lines) {
  if (line.trim()) {
    total += Number.parseInt(line.trim())
  }
  else {
    if (total > max) {
      totals.push(total)
    }

    total = 0
  }
}
totals.push(total)

const sorted = totals.sort((a, b) => b - a)
console.log(sorted[0])
console.log(sorted[1])
console.log(sorted[2])
console.log(sorted[0]+sorted[1]+sorted[2])