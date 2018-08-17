const signale = require('signale')
const { grey, underline, blue } = require('chalk')
const { log, success, pending, fatal } = signale

signale.config({ displayLabel: false })

class Render {
  _buildTaskMessage (task) {
    const id = `${task.id}.`
    const prefix = `    ${grey(id)} `
    const message = task.finished ? grey(task.message) : task.message
    const suffix = grey('2d')
    return { prefix, message, suffix }
  }

  _buildProjectTitle (project, projectContent) {
    const projectTitle = blue(`@${project}`)
    const totalCommits = projectContent.length
    const totalFinished = projectContent.filter(task => task.finished).length
    return `  ${underline(projectTitle)} [${totalFinished}/${totalCommits}]`
  }

  drawTaskList (tasks) {
    Object.keys(tasks).forEach(project => {
      const currentProject = tasks[project]
      log(this._buildProjectTitle(project, tasks[project]))
      currentProject.forEach(task => {
        const output = this._buildTaskMessage(task)
        if (task.finished) {
          success(output)
        } else {
          pending(output)
        }
      })
    })
  }

  logError (error) {
    fatal({ prefix: '  ', message: `${error.message}` })
  }
}

module.exports = new Render()
