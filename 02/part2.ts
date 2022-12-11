import fs from 'fs'

// A, X = Rock, 1
// B, Y = Paper, 2
// C, Z = Scissors, 3
// Loss = 0, Draw = 3, Win = 6

enum Choice {
  Rock,
  Paper,
  Scissors
}

const OUTCOME_POINTS_MAP: Record<string, number> = {
  'X': 0,
  'Y': 3,
  'Z': 6,
}

const SELECTION_POINTS_MAP: Record<Choice, number> = {
  [Choice.Rock]: 1,
  [Choice.Paper]: 2,
  [Choice.Scissors]: 3,
}

const SELECTION_MAP: Record<string, Record<string, Choice>> = {
  'A': {
    'X': Choice.Scissors,
    'Y': Choice.Rock,
    'Z': Choice.Paper,
  },
  'B': {
    'X': Choice.Rock,
    'Y': Choice.Paper,
    'Z': Choice.Scissors,
  },
  'C': {
    'X': Choice.Paper,
    'Y': Choice.Scissors,
    'Z': Choice.Rock,
  }
}

const file = fs.readFileSync('./02/input.txt').toString()
const lines = file.split('\n')

let total = 0
for (const line of lines) {
  const [opp, result] = line.trim().split(' ')
  
  const points: number = OUTCOME_POINTS_MAP[result] + SELECTION_POINTS_MAP[SELECTION_MAP[opp][result]]
  total += points
}

console.log(total)
