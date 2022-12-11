import fs from 'fs'

const SHOULD_LOG = false
const file = fs.readFileSync('./11/input.txt', 'utf-8').toString()
const lines = file.split('\n').map((l) => l.replace(/(\r\n|\n|\r)/gm, '').trim())

const log = (message?: any, ...optionalParams: any[]): void => {
  if (SHOULD_LOG) {
    console.log(message, ...optionalParams)
  }
}

class Monkey {
  public items: Array<number>
  public numberOfInspections: number = 0
  public divisorVal: number = 1
  public operation: (num: number) => number
  public getNextMonkey: (num: number) => number

  public constructor(
    startingItems: Array<number>,
    opCommand: string,
    opVal: string,
    testVal: number,
    indexIfTrue: number,
    indexIfFalse: number,
  ) {
    this.items = [...startingItems]
    this.divisorVal = testVal
    this.operation = (num: number) => {
      const change = opVal === 'old' ? num : Number(opVal)

      if (opCommand === '*') {
        return num * change
      }

      // NOTE: only supports * and +
      return num + change
    }
    this.getNextMonkey = (num: number): number => {
      if (num % testVal === 0) {
        return indexIfTrue
      }

      return indexIfFalse
    }
  }
}

const monkeys: Array<Monkey> = []

// Create monkeys
let startingItems: Array<number> = []
let opCommand: string = ''
let opVal: string = ''
let testVal: number = 0
let indexIfTrue: number = 0
let indexIfFalse: number = 0

for (const line of [...lines, '']) {
  log(line)
  if (line === '') {
    console.log(startingItems, opCommand, opVal, testVal, indexIfTrue, indexIfFalse)
    monkeys.push(new Monkey(startingItems, opCommand, opVal, testVal, indexIfTrue, indexIfFalse))
    continue
  }

  if (line.startsWith('Monkey')) {
    continue
  }

  if (line.startsWith('Starting items:')) {
    const values = line.split('Starting items: ')
    values.shift()
    startingItems = values.join('').split(', ').map(Number)
    continue
  }

  if (line.startsWith('Operation')) {
    const values = line.split(' = ')
    values.shift()
    const [, op, val] = values.join('').split(' ')
    opCommand = op
    opVal = val
    continue
  }

  if (line.startsWith('Test')) {
    const values = line.split(' divisible by ')
    const [, val] = values
    testVal = Number(val)
    continue
  }

  if (line.startsWith('If true: ')) {
    const values = line.split(' throw to monkey ')
    const [, val] = values
    indexIfTrue = Number(val)
    continue
  }

  if (line.startsWith('If false: ')) {
    const values = line.split(' throw to monkey ')
    const [, val] = values
    indexIfFalse = Number(val)
    continue
  }
}

const TOTAL_MULTI_OF_ALL_DIVISORS = monkeys.reduce((prev, m) => prev * m.divisorVal, 1);

// const NUM_ROUNDS = 20
const NUM_ROUNDS = 10_000

for (let round = 0; round < NUM_ROUNDS; round++) {
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i]
    log('Monkey', i)
    for (const item of monkey.items) {
      monkey.numberOfInspections++

      log('Monkey inspects an item with a worry level of', item)
      let newLevel = monkey.operation(item)
      log('New worry level of', newLevel)
      newLevel = Math.floor(newLevel % TOTAL_MULTI_OF_ALL_DIVISORS)
      log('Monkey gets bored with item, New level', newLevel)
      const newIndex = monkey.getNextMonkey(newLevel)
      log('New monkey', newIndex)
      monkeys[newIndex].items.push(newLevel)
    }
    monkey.items = []
  }
}

for (let i = 0; i < monkeys.length; i++) {
  const monkey = monkeys[i]
  console.log('Monkey', i, ':', monkey.numberOfInspections)
}

const monkeyBusiness = monkeys
  .sort((a, b) => b.numberOfInspections - a.numberOfInspections)
  .reduce((prev, m, i) => (i <= 1 ? prev * m.numberOfInspections : prev), 1)
console.log(monkeyBusiness)
