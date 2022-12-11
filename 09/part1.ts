import fs from 'fs'

const file = fs.readFileSync('./09/input.txt', 'utf-8').toString()
const lines = file.split('\n').map((l) => l.replace(/(\r\n|\n|\r)/gm, ''))

const coordinateCount: Record<string, number> = {}

let tX = 0,
  tY = 0,
  hX = 0,
  hY = 0

// Record initial 0,0 state
coordinateCount[`${tX}|${tY}`] = 1

const isTailTouching = ({ hX, hY, tX, tY }: { hX: number; hY: number; tX: number; tY: number }): boolean => {
  const isTouching = Math.abs(hX - tX) <= 1 && Math.abs(hY - tY) <= 1
  console.log('Head at', hX, hY, isTouching ? 'is' : 'is not', 'touching Tail at', tX, tY)
  return isTouching
}

for (const line of lines) {
  console.log('Head is at', hX, hY, 'Tail is at', tX, tY)
  const [dir, steps] = line.split(' ')

  for (let i = 0; i < Number(steps); i++) {
    if (dir === 'L') {
      hX--
    } else if (dir === 'R') {
      hX++
    } else if (dir === 'U') {
      hY++
    } else if (dir === 'D') {
      hY--
    }

    if (!isTailTouching({ hX, hY, tX, tY })) {
      // const isSameRow = hY === tY
      // const isSameCol = hX === tX

      if (dir === 'L') {
        tX--
        tY = hY
      } else if (dir === 'R') {
        tX++
        tY = hY
      } else if (dir === 'U') {
        tY++
        tX = hX
      } else if (dir === 'D') {
        tY--
        tX = hX
      }
    }

    // record
    if (!coordinateCount[`${tX}|${tY}`]) {
      coordinateCount[`${tX}|${tY}`] = 1
    } else {
      coordinateCount[`${tX}|${tY}`]++
    }
  }
}

console.log(coordinateCount)
console.log(Object.keys(coordinateCount).length)
