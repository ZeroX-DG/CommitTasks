const fs = require('fs')
const os = require('os')
const path = require('path')
const Task = require('./task')

class TaskAPI {
  constructor () {
    this.tasks = []
    this.dataPath = path.join(os.homedir(), '.commit-tasks.json')
    try {
      if (!fs.existsSync(this.dataPath)) {
        fs.writeFileSync(this.dataPath, '[]')
      }
      this.tasks = JSON.parse(fs.readFileSync(this.dataPath))
    } catch (error) {
      throw error
    }
  }

  addTask (message, project) {
    const task = new Task({ message, project })
    this.tasks.push(task)
    this.save()
  }

  save () {
    fs.writeFileSync(this.dataPath, JSON.stringify(this.tasks))
  }
}

module.exports = TaskAPI
