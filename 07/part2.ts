import fs from 'fs'

const SEPARATOR = '/'

const file = fs.readFileSync('./07/input.txt', 'utf-8').toString()
const lines = file.split('\n')

interface Directory {
  files: Record<string, number>
  directories: Array<string>
}

const filesystem: Record<string, Directory> = {}
const getSizeOfDir = (dir: string): number => {
  const { files, directories } = filesystem[dir] ?? { files: {}, directories: [] }

  const sizeOfFiles = Object.values(files).reduce((prev, size) => prev + size, 0)
  const sizeOfDirs = directories.reduce((prev, dirName) => prev + getSizeOfDir(dirName), 0)

  return sizeOfFiles + sizeOfDirs
}

let currentDir: Directory = {
  files: {},
  directories: [],
}
let currentDirName: string = ''

const moveOutOfDir = (): string => {
  const dirs = currentDirName.split(SEPARATOR)
  dirs.pop()
  const newDirName = dirs.join(SEPARATOR) || ''
  
  // console.log('size of dir', currentDirName, getSizeOfDir(currentDirName))
  // console.log('moving out of', currentDirName, 'to', newDirName)
  
  currentDir = filesystem[newDirName]
  currentDirName = newDirName

  return currentDirName
}

for (const fullLine of lines) {
  const line = fullLine.replace(/(\r\n|\n|\r)/gm, '')

  if (line.startsWith('$ ls') || line.startsWith('$ cd /')) {
    continue
  }

  if (line.startsWith('$ cd ..')) {
    moveOutOfDir()
    continue
  }

  if (line.startsWith('$ cd')) {
    filesystem[currentDirName] = currentDir
    const newDirName = currentDirName ? currentDirName + SEPARATOR + line.split(' ')[2] : line.split(' ')[2]

    // console.log('moving into', newDirName, 'from', currentDirName)

    currentDirName = newDirName
    currentDir = {
      files: {},
      directories: [],
    }
    filesystem[currentDirName] = currentDir
    continue
  }

  if (line.startsWith('dir ')) {
    const dirName = line.split(' ')[1]
    const dirPath = currentDirName ? currentDirName + SEPARATOR + dirName : dirName
    // console.log('Found sub dir', dirPath)
    currentDir.directories.push(dirPath)
  } else {
    const fileSize = Number(line.split(' ')[0])
    const fileName = line.split(' ')[1]
    // console.log('Found file', fileName,'of size', fileSize, 'in dir', currentDirName)
    currentDir.files[fileName] = fileSize
  }
}

// console.log(filesystem)

const MAX_SPACE = 70_000_000
const DESIRED_UNUSED_SPACE = 30_000_000
const CURRENT_UNUSED_SPACE = MAX_SPACE - getSizeOfDir('')

console.log('CURRENT_UNUSED_SPACE', CURRENT_UNUSED_SPACE)

let currentMin = Number.MAX_VALUE
for (const dir of Object.keys(filesystem)) {
  const size = getSizeOfDir(dir)

  // console.log(dir, size)

  if (CURRENT_UNUSED_SPACE + size >= DESIRED_UNUSED_SPACE && currentMin > size) {
    currentMin = size
  }
}

console.log(currentMin)
