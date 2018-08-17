class Task {
  constructor ({ message, createAt, finished, project }) {
    this.commitMessage = message
    this.createAt = createAt || new Date().getTime()
    this.finished = finished || false
    this.project = project
  }
}

module.exports = Task
