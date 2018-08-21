const { blue, green } = require('chalk')
const loggers = {
  success: data => {
    if (typeof data === 'string') {
      console.log(`${green('◉')} ${data}`)
    } else {
      const result = `${data.prefix}${green('◉')} ${data.message}${data.suffix}`
      console.log(result)
    }
  },
  fatal: data => {
    if (typeof data === 'string') {
      console.log(`✖ ${data}`)
    } else {
      const result = `${data.prefix}✖ ${data.message}${data.suffix}`
      console.log(result)
    }
  },
  pending: data => {
    if (typeof data === 'string') {
      console.log(`${blue('◯')} ${data}`)
    } else {
      const result = `${data.prefix}${blue('◯')} ${data.message}${data.suffix}`
      console.log(result)
    }
  },
  log: data => {
    if (typeof data === 'string') {
      console.log(`${data}`)
    } else {
      const result = `${data.prefix}${data.message}${data.suffix}`
      console.log(result)
    }
  }
}

module.exports = loggers
