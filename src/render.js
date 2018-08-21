const { grey, underline, blue, red, green, yellow } = require('chalk')
const { log, success, pending, fatal } = require('./logger')
const path = require('path')

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
    const suffix = ` - ${grey(displayDay)}`
    return { prefix, message, suffix }
  }

  _buildProjectTitle (project, projectContent) {
    const projectTitle = yellow(`${project}`)
    const totalCommits = projectContent.length
    const totalFinished = projectContent.filter(task => task.finished).length
    const projectStats = `${yellow(
      '[' + totalFinished + '/' + totalCommits + ' finished]'
    )}`
    return `\n  ${yellow('●')} ${projectTitle} ${projectStats}\n`
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

  drawFileList (files) {
    const tree = []
    ;[...files].forEach(file => {
      const parts = file.split(path.sep)
      let parent = tree
      parts.forEach((part, index) => {
        const desiredPath = parent.find(p => p.name === part)
        if (desiredPath) {
          parent = desiredPath.children
        } else {
          const newPath = { name: part, children: [] }
          parent.push(newPath)
          parent = newPath.children
          if (index === parts.length - 1) {
            part = yellow(part)
          } else {
            part = part + '/'
          }
          log({ prefix: ' '.repeat((index + 2) * 2), message: part })
        }
      })
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
