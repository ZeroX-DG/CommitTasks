const render = require('./render')
const fs = require('fs')
const os = require('os')
const path = require('path')

const TaskManager = (flags, input) => {
  let task = []
  try {
    const dataPath = path.join(os.homedir(), '.commit-tasks.json')
    task = JSON.parse(fs.readFileSync(dataPath))
  } catch (error) {
    render.logError(error)
  }
  return render.drawTaskList(task)
}

module.exports = TaskManager
