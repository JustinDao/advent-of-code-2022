import fs from 'fs'

const file = fs.readFileSync('./04/input.txt').toString()
const lines = file.split('\n')

let total = 0
for (const line of lines) {
  const [firstMin, firstMax, secondMin, secondMax] = 
    line // 5-10,1-4
      .split(',') // [5-10, 1-4]
      .map(elf => elf.split('-').map(Number)) // [[5,10],[1,4]]
      .sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]) // [[1,4],[5,10]]
      .flatMap(a => a) // [1,4,5,10]
  
  // first sort by max, then sort by min
  // 6 cases
  // A) 1 4 | 5 10 // first max < second min NO MATCH
  // B) 1 5 | 5 10 // first max === second min
  // C) 1 6 | 5 10 // first max > second min
  // D) 5 8 | 5 10 // first min === second min
  // E) 6 7 | 5 10 // first min > second min && first max < second max
  // F) 5 10 | 7 10 // first upper === second upper
    
  const hasOverlap = 
    (firstMax >= secondMin) || // B & C
    (firstMin === secondMin) || // D
    (firstMin > secondMin && firstMax < secondMax) || // E
    (firstMax === secondMax) // F

  console.log(firstMin, firstMax, secondMin, secondMax, hasOverlap)

  if (hasOverlap) {
    total += 1   
  }
}

console.log(total)

