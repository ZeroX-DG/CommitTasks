const signale = require('signale')
const { grey, underline, blue, red, green } = require('chalk')
const { log, success, pending, fatal } = signale

signale.config({ displayLabel: false })

class Render {
  _buildTaskMessage (task) {
    const id = `${task.id}.`
    const prefix = `    ${grey(id)} `
    const message = task.finished ? grey(task.message) : task.message
    const taskCreateDate = new Date(task.createAt)
    const now = new Date()
    const timeDiff = Math.abs(now.getTime() - taskCreateDate.getTime())
    const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24))
    const displayDay = diffDays ? `${diffDays}d` : 'today'
    const suffix = `- ${green(displayDay)}`
    return { prefix, message, suffix }
  }

  _buildProjectTitle (project, projectContent) {
    const projectTitle = blue(`@${project}`)
    const totalCommits = projectContent.length
    const totalFinished = projectContent.filter(task => task.finished).length
    return `  ${underline(projectTitle)} [${totalFinished}/${totalCommits}]`
  }

  drawTaskList (tasks) {
    const projects = Object.keys(tasks)
    if (projects.length === 0) {
      return log({
        prefix: '  ',
        message: underline(
          blue('No task to display! Use --help to get started')
        )
      })
    }
    projects.forEach(project => {
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

  drawProjectTaskList (tasks, project) {
    const projectTasks = tasks[project]
    if (projectTasks.length === 0) {
      return log({
        prefix: '  ',
        message: underline(blue('No task to display!'))
      })
    }
    log(this._buildProjectTitle(project, projectTasks))
    projectTasks.forEach(task => {
      const output = this._buildTaskMessage(task)
      if (task.finished) {
        success(output)
      } else {
        pending(output)
      }
    })
  }

  logError (error) {
    error = typeof error === 'string' ? error : error.message
    fatal({ prefix: '  ', message: `${red(error)}` })
  }

  logSuccess (message) {
    success({ prefix: '  ', message: green(message) })
  }

  log (message) {
    log({ prefix: '  ', message: message.trim() })
  }
}

module.exports = new Render()
