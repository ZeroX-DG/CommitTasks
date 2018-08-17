const TaskAPI = require('./task-api')

const TaskManager = (flags, input) => {
  const api = new TaskAPI()

  if (flags.task) {
    api.addTask(input)
  }

  return api.drawTaskList()
}

module.exports = TaskManager
