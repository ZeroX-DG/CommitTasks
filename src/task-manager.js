const render = require('./render')

const TaskManager = (flags, input) => {
  return render.drawTaskList({
    SnippetList: [
      { id: 1, message: 'Add text color', finished: true },
      { id: 2, message: 'Add more text color', finished: false }
    ]
  })
}

module.exports = TaskManager
