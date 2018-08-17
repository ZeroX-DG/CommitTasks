const render = require('./render')
const TaskAPI = require('./task-api')

const TaskManager = (flags, input) => {
  let api = null
  try {
    api = new TaskAPI()
  } catch (error) {
    render.logError(error)
  }
  if (flags.task) {
  }
  return render.drawTaskList(api.tasks)
}

module.exports = TaskManager
