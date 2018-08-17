const TaskAPI = require('./task-api')

const TaskManager = (flags, input) => {
  const api = new TaskAPI()

  if (flags.task) {
    return api.addTask(input, flags.create)
  }

  return api.drawTaskList()
}

module.exports = TaskManager
