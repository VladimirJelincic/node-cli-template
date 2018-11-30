
const readline = require('readline')
const events = require('events')
class _events extends events { }
const e = new _events()

const validInputs = [
  'man', 'help', 'exit',
]

// Input handlers
e.on('man', function (str) {
  console.log('You chose the man command')
});

e.on('help', function (str) {
  e.emit('man')
});

e.on('exit', () => {
  process.exit(0)
})

const cli = {
  processInput: (str) => {

    const inputLine = typeof str == 'string' && str.trim().length > 0 ? str.trim() : false

    if (inputLine) {
      let matchFound = false

      validInputs.some((input) => {
        if (inputLine.toLowerCase().includes(input)) {
          matchFound = true;
          e.emit(input, inputLine)
          return true;
        }
      })
      if (!matchFound) {
        console.log('Command not found!')
      }
    }
  },

  init: () => {
    console.log('\x1b[34m%s\x1b[0m', 'The CLI is running')
    const _interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ''
    })
    _interface.on('line', str => {
      cli.processInput(str)
      _interface.prompt();
    })
    _interface.on('close', () => {
      process.exit(0)
    })
  },
  verticalSpace: (lines) => {
    const lineNum = typeof lines === 'number' && lines > 0 ? lines : 1
    for (i = 0; i < lines; i++) {
      console.log('')
    }
  },
  horizontalLine: () => {
    const width = process.stdout.columns;
    const line = '';
    for (i = 0; i < width; i++) {
      line += '-'
    }
    console.log(line)
  },
  centered: (str) => {
    const strVal = typeof str === 'string' && str.trim().length > 0 ? str.trim() : ''
  }
}
module.exports = cli