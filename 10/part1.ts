import fs from 'fs'

const file = fs.readFileSync('./10/input.txt', 'utf-8').toString()
const lines = file.split('\n').map((l) => l.replace(/(\r\n|\n|\r)/gm, ''))

const CYCLES_TO_CHECK = new Set([20, 60, 100, 140, 180, 220])
let sumOfChecks = 0

let numCycles = 0
let X = 1

for (const line of lines) {
  const [command, value] = line.split(' ')

  let cyclesForCommand: number

  if (command === 'noop') {
    cyclesForCommand = 1
  }
  else {
    // addx, takes 2 cycles
    cyclesForCommand = 2
  }

  for (let i = 1; i <= cyclesForCommand; i++) {
    numCycles += 1

    // check cycles, addition happens AFTER the check
    if (CYCLES_TO_CHECK.has(numCycles)) {
      const strength = numCycles * X
      console.log(numCycles, X, strength)
      sumOfChecks += strength
    }

    if (i === cyclesForCommand && value) {
      X += Number(value)
    }
  }  
}

console.log(sumOfChecks)