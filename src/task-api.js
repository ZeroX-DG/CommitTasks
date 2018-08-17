const fs = require('fs')
const os = require('os')
const path = require('path')
const Task = require('./task')
const render = require('./render')

class TaskAPI {
  constructor () {
    this.tasks = {}
    this.dataPath = path.join(os.homedir(), '.commit-tasks.json')
    try {
      if (!fs.existsSync(this.dataPath)) {
        fs.writeFileSync(this.dataPath, '{}')
      }
      this.tasks = JSON.parse(fs.readFileSync(this.dataPath))
    } catch (error) {
      render.logError(error)
    }
  }

  getLastTaskOfProject (project) {
    return this.tasks[this.tasks[project].length - 1]
  }

  addTask (input, createProject) {
    if (!input[0].startsWith('@')) {
      render.logError(
        'Wrong add task command syntax. Type --help for more info'
      )
      return
    }
    const project = input[0].slice(1)
    if (!this.tasks[project] && createProject) {
      this.tasks[project] = []
    } else if (!this.tasks[project] && !createProject) {
      render.logError(`There are no projects named ${project}`)
      return
    }
    input.shift()
    const message = input.join(' ')
    const id = this.getLastTaskOfProject(project) || 1
    const task = new Task({ id, message, project })
    this.tasks[project].push(task)
    this.save()
  }

  drawTaskList () {
    render.drawTaskList(this.tasks)
  }

  save () {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.tasks))
    } catch (error) {
      render.logError(error)
    }
  }
}

module.exports = TaskAPI
