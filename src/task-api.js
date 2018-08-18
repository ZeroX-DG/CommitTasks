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
    const project = input[0]
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
    render.logSuccess(`Created task ${message}`)
  }

  drawTaskList () {
    render.drawTaskList(this.tasks)
  }

  removeTask (input) {
    const project = input[0]
    const taskId = input[1]
    this.tasks[project] = this.tasks[project].filter(task => task.id !== taskId)
    this.save()
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
