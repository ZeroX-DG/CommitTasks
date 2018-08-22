const { blue, green, red, black } = require('chalk')
const loggers = {
  success: data => {
    if (typeof data === 'string') {
      console.log(`${green('◉')} ${data}`)
    } else {
      const prefix = `${data.prefix || ''}${green('◉')} `
      let message = `${data.message || ''}`
      if (data.highlight) {
        switch (data.highlight) {
          case 'urgent':
            message = `${black.bgYellow(message)}`
            break
          case 'important':
            message = `${black.bgBlue(message)}`
            break
        }
      }
      const suffix = `${data.suffix || ''}`
      const result = prefix + message + suffix
      console.log(result)
    }
  },
  fatal: data => {
    if (typeof data === 'string') {
      console.log(`${red('✖')} ${data}`)
    } else {
      const result = `${data.prefix || ''}${red('✖')} ${data.message ||
        ''}${data.suffix || ''}`
      console.log(result)
    }
  },
  pending: data => {
    if (typeof data === 'string') {
      console.log(`${blue('◯')} ${data}`)
    } else {
      const result = `${data.prefix || ''}${blue('◯')} ${data.message ||
        ''}${data.suffix || ''}`
      console.log(result)
    }
  },
  log: data => {
    if (typeof data === 'string') {
      console.log(`${data}`)
    } else {
      const result = `${data.prefix || ''}${data.message || ''}${data.suffix ||
        ''}`
      console.log(result)
    }
  }
}

module.exports = loggers
