import fs from 'fs'

// A, X = Rock, 1
// B, Y = Paper, 2
// C, Z = Scissors, 3
// Loss = 0, Draw = 3, Win = 6

const SELECTION_POINTS_MAP: Record<string, number> = {
  'X': 1,
  'Y': 2,
  'Z': 3,
}

const RESULTS_POINTS_MAP: Record<string, Record<string, number>> = {
  'A': {
    'X': 3,
    'Y': 6,
    'Z': 0,
  },
  'B': {
    'X': 0,
    'Y': 3,
    'Z': 6,
  },
  'C': {
    'X': 6,
    'Y': 0,
    'Z': 3,
  }
}

const file = fs.readFileSync('./02/input.txt').toString()
const lines = file.split('\n')

let total = 0
for (const line of lines) {
  const [opp, me] = line.trim().split(' ')
  
  const points: number = SELECTION_POINTS_MAP[me] + RESULTS_POINTS_MAP[opp][me]
  total += points
}

console.log(total)
