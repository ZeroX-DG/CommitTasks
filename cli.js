#!/usr/bin/env node
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
    edit: {
      type: 'boolean',
      alias: 'e'
    },
    create: {
      type: 'boolean',
      alias: 'cp'
    },
    highlight: {
      type: 'boolean',
      alias: 'hl'
    },
    files: {
      type: 'boolean',
      alias: 'cf'
    }
  }
})

TaskManager(cli.flags, cli.input)
