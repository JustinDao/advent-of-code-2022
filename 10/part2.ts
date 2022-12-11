import fs from 'fs'
import _ from 'lodash'

const file = fs.readFileSync('./10/input.txt', 'utf-8').toString()
const lines = file.split('\n').map((l) => l.replace(/(\r\n|\n|\r)/gm, ''))

let numCycles = 0
let X = 1

const crtPixels = []

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
    // Calculation happens before addition
    const spriteVisible = Math.abs(X - numCycles % 40) <= 1

    if (spriteVisible) {
      crtPixels.push('#')
    }
    else {
      crtPixels.push('.')
    }

    numCycles += 1
    if (i === cyclesForCommand && value) {
      X += Number(value)
    }
  }  
}

_.chunk(crtPixels, 40).forEach(chunk => {
  console.log(chunk.join(''))
})