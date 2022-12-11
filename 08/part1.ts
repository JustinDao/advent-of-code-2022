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

let countVisible = 0

// console.log(treeGridYX[y][x], 'at', x, y, 'not visible due to', treeGridYX[y][xIndex], 'at', y, xIndex)

const lengthOfColumn = treeGridYX.length
for (let y = 0; y < lengthOfColumn; y++) {
  const lengthOfRow = treeGridYX[y].length

  for (let x = 0; x < lengthOfRow; x++) {
    if (x === 0 || y === 0 || x === lengthOfColumn - 1 || y === lengthOfRow - 1) {
      countVisible += 1
      continue
    } else {
      let isVisibleLeft = true
      let isVisibleRight = true
      let isVisibleTop = true
      let isVisibleBottom = true

      // check left
      for (let xIndex = 0; xIndex < x; xIndex++) {
        if (treeGridYX[y][xIndex] >= treeGridYX[y][x]) {
          isVisibleLeft = false
          // console.log(treeGridYX[y][x], 'at', x, y, 'not visible left due to', treeGridYX[y][xIndex], 'at', y, xIndex)
          break
        }
      }

      // check right
      for (let xIndex = x + 1; xIndex < lengthOfRow; xIndex++) {
        if (treeGridYX[y][xIndex] >= treeGridYX[y][x]) {
          isVisibleRight = false
          // console.log(treeGridYX[y][x], 'at', x, y, 'not visible right due to', treeGridYX[y][xIndex], 'at', y, xIndex)
          break
        }
      }

      // check top
      for (let yIndex = 0; yIndex < y; yIndex++) {
        if (treeGridYX[yIndex][x] >= treeGridYX[y][x]) {
          isVisibleTop = false
          // console.log(treeGridYX[y][x], 'at', x, y, 'not visible top due to', treeGridYX[yIndex][x], 'at', yIndex, x)
          break
        }
      }

      // check bottom
      for (let yIndex = y + 1; yIndex < lengthOfColumn; yIndex++) {
        if (treeGridYX[yIndex][x] >= treeGridYX[y][x]) {
          isVisibleBottom = false
          // console.log(treeGridYX[y][x], 'at', x, y, 'not visible bottom due to', treeGridYX[yIndex][x], 'at', yIndex, x)
          break
        }
      }

      if (isVisibleLeft || isVisibleRight || isVisibleTop || isVisibleBottom) {
        countVisible += 1
      }
    }
  }
}

console.log(countVisible)
