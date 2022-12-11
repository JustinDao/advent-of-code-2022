import fs from 'fs'

const file = fs.readFileSync('./09/input.txt', 'utf-8').toString()
const lines = file.split('\n').map((l) => l.replace(/(\r\n|\n|\r)/gm, ''))

const coordinateCount: Record<string, number> = {}

interface Coordinate {
  x: number
  y: number
}

const numberOfNodes = 10
const rope: Array<Coordinate> = []
for (let i = 0; i < numberOfNodes; i++) {
  rope.push({ x: 0, y: 0 })
}

const printMap = (): void => {
  const max = 20
  const coordinates: Record<number, Record<number, number | string>> = {}
  rope.forEach((coor, index) => {
    if (!coordinates[coor.x]) {
      coordinates[coor.x] = {}
    }

    if (coordinates[coor.x][-coor.y]) {
      return
    }

    coordinates[coor.x][-coor.y] = index === 0 ? 'H' : index
  })

  for (let y = -max; y < max; y++) {
    let line = `${-y}\t`
    for (let x = -max; x < max; x++) {
      if (coordinates[x] && coordinates[x][y] !== undefined) {
        line += coordinates[x][y]
      } else if (x === 0 && y === 0) {
        line += 's'
      }
      else {
        line += '.'
      }
    }
    console.log(line)
  }

  console.log('===============')
}

const isTouching = (current: Coordinate, previous: Coordinate): boolean => {
  const isTouching = Math.abs(current.x - previous.x) <= 1 && Math.abs(current.y - previous.y) <= 1
  return isTouching
}

const move = (index: number, dir: string): void => {
  const inFront = rope[index - 1]
  const current = rope[index]
  const behind = rope[index + 1]

  if (inFront) {
    if (current.y !== inFront.y) { inFront.y > current.y ? current.y++ : current.y-- }
    if (current.x !== inFront.x) { inFront.x > current.x ? current.x++ : current.x-- }
  }
  else {
    // Head
    if (dir === 'L') {
      current.x--
    } else if (dir === 'R') {
      current.x++
    } else if (dir === 'U') {
      current.y++
    } else if (dir === 'D') {
      current.y--
    }
  }

  if (behind && !isTouching(current, behind)) {
    move(index + 1, dir)
  }
}

for (const line of lines) {
  const [dir, steps] = line.split(' ')

  for (let i = 0; i < Number(steps); i++) {
    move(0, dir)

    const tail = rope[rope.length - 1]
    const tailKey = `${tail.x}|${tail.y}`
    if (!coordinateCount[tailKey]) {
      coordinateCount[tailKey] = 1
    }
    else {
      coordinateCount[tailKey]++
    }

    // printMap()
  }

  // console.log(line)
  // printMap()
}

// console.log(coordinateCount)
console.log(Object.keys(coordinateCount).length)
