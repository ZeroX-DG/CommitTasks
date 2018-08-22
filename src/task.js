class Task {
  constructor ({ id, message, createAt, finished, project, highlight }) {
    this.id = id
    this.message = message
    this.createAt = createAt || new Date().getTime()
    this.finished = finished || false
    this.project = project
    this.highlight = highlight
  }
}

module.exports = Task
