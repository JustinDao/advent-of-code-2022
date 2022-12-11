import fs from 'fs'
import _ from 'lodash'

const file = fs.readFileSync('./05/input.txt', 'utf-8').toString()
const lines = file.split('\n')

const stacks: Array<Array<string>> = []

let areStacksInitialzed = false
let startMove = false
for (const fullLine of lines) { 
  const line = fullLine.replace(/(\r\n|\n|\r)/gm, "");
  if (line === '') continue

  if (!startMove) {
    if (!areStacksInitialzed) {
      // 3 chars per box, 1 space, adding 1 to the length to account for the last box
      
      const numberOfStacks = _.chunk(line.split(''), 4).length      

      for (let i = 0; i < numberOfStacks; i++) {
        stacks.push([])
      }
      
      areStacksInitialzed = true
    }

    // I'm lazy
    if (line === ' 1   2   3   4   5   6   7   8   9 ') {
      stacks.forEach((s) => s.reverse())
      startMove = true
      continue
    }

    const chunks = _.chunk(line.split(''), 4)

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      if (!chunk[1].trim()) continue // skip blank box

      stacks[i].push(chunk[1])
    }

    continue
  }

  // move 2 from 7 to 2
  const [,numberToMove,,from,,to] = line.split(' ')

  const moved = []
  for (let i = 0; i < Number(numberToMove); i++) {
    const value = stacks[Number(from)-1].pop()!
    moved.push(value)
  }
  stacks[Number(to)-1].push(...moved.reverse())
}

let result = []
for (const stack of stacks)  {
  result.push(stack.pop())
}
console.log(result.join(''))


