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
    if (!input[0].startsWith('@')) {
      render.logError({
        message: 'Wrong add task command syntax. Type --help for more info'
      })
      return
    }
    const project = input[0]
    input.shift()
    const message = input.join(' ')
    api.addTask(message, project)
  }
  return render.drawTaskList(api.tasks)
}

module.exports = TaskManager
