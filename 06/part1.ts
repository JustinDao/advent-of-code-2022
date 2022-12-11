import fs from 'fs'

const file = fs.readFileSync('./06/input.txt', 'utf-8').toString()
const lines = file.split('\n')
const line = lines[0]

const lastMessage = []
const lengthOfMessage = 4
let numChar = lengthOfMessage
for (const char of line) {
  lastMessage.push(char)

  if (lastMessage.length === lengthOfMessage) {
    const uniq = new Set(lastMessage)
    if (uniq.size === lengthOfMessage) {
      console.log(numChar)
      break
    }

    numChar += 1
    lastMessage.shift()
  }
}
