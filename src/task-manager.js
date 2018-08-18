const TaskAPI = require('./task-api')

const TaskManager = (flags, input) => {
  const api = new TaskAPI()

  if (flags.task) {
    return api.addTask(input, flags.create)
  }

  if (flags.remove) {
    return api.removeTask(input)
  }

  if (flags.commit) {
    return api.commitTask(input)
  }

  return api.drawTaskList()
}

module.exports = TaskManager
