import fs from 'fs'

const file = fs.readFileSync('./08/input.txt', 'utf-8').toString()
const lines = file.split('\n').map((l) => l.replace(/(\r\n|\n|\r)/gm, ''))

const treeGridYX: Array<Array<number>> = []

for (let y = 0; y < lines.length; y++) {
  const line = lines[y]
  const chars = line.split('')
  for (let x = 0; x < chars.length; x++) {
    if (!treeGridYX[y]) {
      treeGridYX[y] = []
    }

    treeGridYX[y][x] = Number(chars[x])
  }
}

// console.log(treeGridYX[y][x], 'at', x, y, 'not visible due to', treeGridYX[y][xIndex], 'at', y, xIndex)

let maxScore = 0

const lengthOfColumn = treeGridYX.length
for (let y = 0; y < lengthOfColumn; y++) {
  const lengthOfRow = treeGridYX[y].length

  for (let x = 0; x < lengthOfRow; x++) {
    let scoreLeft = 0
    let scoreRight = 0
    let scoreTop = 0
    let scoreBottom = 0

    // check left
    for (let xIndex = x - 1; xIndex >= 0; xIndex--) {
      scoreLeft += 1
      if (treeGridYX[y][xIndex] >= treeGridYX[y][x]) {
        break
      }
    }

    // check right
    for (let xIndex = x + 1; xIndex < lengthOfRow; xIndex++) {
      scoreRight += 1
      if (treeGridYX[y][xIndex] >= treeGridYX[y][x]) {
        break
      }
    }

    // check top
    for (let yIndex = y - 1; yIndex >= 0; yIndex--) {
      scoreTop += 1
      if (treeGridYX[yIndex][x] >= treeGridYX[y][x]) {
        break
      }
    }

    // check bottom
    for (let yIndex = y + 1; yIndex < lengthOfColumn; yIndex++) {
      scoreBottom += 1
      if (treeGridYX[yIndex][x] >= treeGridYX[y][x]) {
        break
      }
    }

    const score = scoreLeft * scoreRight * scoreTop * scoreBottom

    if (score > maxScore) {
      maxScore = score

      console.log(
        'The score for',
        treeGridYX[y][x],
        'at',
        x,
        y,
        'is',
        score,
        scoreLeft,
        scoreRight,
        scoreTop,
        scoreBottom,
      )
    }
  }
}

console.log(maxScore)
