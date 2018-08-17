const meow = require('meow')
const help = require('./src/help')
const TaskManager = require('./src/task-manager')

const cli = meow(help, {
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    },
    version: {
      type: 'boolean',
      alias: 'v'
    },
    task: {
      type: 'boolean',
      alias: 't'
    },
    remove: {
      type: 'boolean',
      alias: 'rm'
    },
    commit: {
      type: 'boolean',
      alias: 'c'
    },
    list: {
      type: 'boolean',
      alias: 'l'
    },
    find: {
      type: 'boolean',
      alias: 'f'
    },
    move: {
      type: 'boolean',
      alias: 'm'
    },
    edit: {
      type: 'boolean',
      alias: 'e'
    },
    create: {
      type: 'boolean',
      alias: 'cp'
    }
  }
})

TaskManager(cli.flags, cli.input)
