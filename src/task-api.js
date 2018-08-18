const fs = require('fs')
const os = require('os')
const path = require('path')
const Task = require('./task')
const render = require('./render')
const git = require('./git-api')
const messages = require('./messages')
const { getMessage, errors, success } = messages

class TaskAPI {
  /**
   *Creates an instance of TaskAPI and create data file if needed
   * @memberof TaskAPI
   */
  constructor () {
    this.tasks = {}
    this.dataPath = path.join(os.homedir(), '.commit-tasks.json')
    try {
      if (!fs.existsSync(this.dataPath)) {
        fs.writeFileSync(this.dataPath, '{}')
      }
      this.tasks = JSON.parse(fs.readFileSync(this.dataPath))
    } catch (error) {
      render.logError(error)
    }
  }

  /**
   *Get the last task in the project
   *
   * @param {String} project
   * @returns {Object}
   * @memberof TaskAPI
   */
  getLastTaskOfProject (project) {
    return this.tasks[project][this.tasks[project].length - 1]
  }

  /**
   *Add a task to a project task list
   *
   * @param {Array<String>} input
   * @param {Boolean} createProject
   * @memberof TaskAPI
   */
  addTask (input, createProject) {
    let project = input[0]
    if (project === '.') {
      project = path.basename(process.cwd())
    }
    // check if the user want to create a new project or it's just a typo
    if (!this.tasks[project] && createProject) {
      this.tasks[project] = []
    } else if (!this.tasks[project] && !createProject) {
      render.logError(getMessage(errors.INVALID_PROJECT_NAME, project))
      return
    }
    // remove the project name from the input array and the rest of it is
    // the commit message
    input.shift()
    const message = input.join(' ')
    const lastTask = this.getLastTaskOfProject(project)
    const id = lastTask ? lastTask.id + 1 : 1
    const task = new Task({ id, message, project })
    this.tasks[project].push(task)
    this.save()
    render.logSuccess(getMessage(success.CREATED_TASK, message))
  }

  /**
   *Draw all tasks in all projects
   *
   * @memberof TaskAPI
   */
  drawTaskList () {
    render.drawTaskList(this.tasks)
  }

  /**
   *Remove a task from a project task list
   *
   * @param {Array<String>} input
   * @memberof TaskAPI
   */
  removeTask (input) {
    let project = input[0]
    let taskId = input[1]
    if (project === '.') {
      project = path.basename(process.cwd())
    }
    // check if the input task id is a number
    taskId = parseInt(taskId)
    if (!taskId) {
      return render.logError(getMessage(errors.INVALID_TASK_ID_TYPE))
    }
    // then check if the project exists
    if (!this.tasks[project]) {
      return render.logError(getMessage(errors.INVALID_PROJECT_NAME, project))
    }
    // then check if the input task id is exists in the project task list
    if (!this.tasks[project].some(task => task.id === taskId)) {
      return render.logError(
        getMessage(errors.NO_TASK_IN_PROJECT, [taskId, project])
      )
    }
    this.tasks[project] = this.tasks[project].filter(task => {
      return task.id !== taskId
    })
    this.save()
    render.logSuccess(getMessage(success.REMOVED_TASK, [taskId, project]))
  }

  /**
   *Commit a task in a project
   *
   * @param {*} input
   * @returns
   * @memberof TaskAPI
   */
  commitTask (input) {
    const project = input[0]
    let taskId = input[1]
    const task = this.getTask(project, taskId)
    if (task) {
      if (task.finished) {
        return render.logError(getMessage(errors.COMMIT_FINISHED_TASK))
      }
      git
        .isNothingtoCommit()
        .then(nothingToCommit => {
          if (nothingToCommit) {
            render.logError(getMessage(errors.NOTHING_TO_COMMIT))
          } else {
            git
              .commit(task.message)
              .then(() => {
                render.logSuccess(
                  getMessage(success.COMITTED_TASK, [taskId, project])
                )
                git
                  .getLastCommitDetails()
                  .then(detail => {
                    render.log(detail)
                    task.finished = true
                    this.save()
                  })
                  .catch(err => {
                    render.logError(err)
                  })
              })
              .catch(err => {
                render.logError(err)
              })
          }
        })
        .catch(error => {
          render.logError(error)
        })
    }
  }

  /**
   *Get a task in the task list
   *
   * @param {String} project
   * @param {String || Number} taskId
   * @returns
   * @memberof TaskAPI
   */
  getTask (project, taskId) {
    if (project === '.') {
      project = path.basename(process.cwd())
    }
    // check if the input task id is a number
    taskId = parseInt(taskId)
    if (!taskId) {
      return render.logError(getMessage(errors.INVALID_TASK_ID_TYPE))
    }
    // then check if the project exists
    if (!this.tasks[project]) {
      return render.logError(getMessage(errors.INVALID_PROJECT_NAME, project))
    }
    // then check if the input task id is exists in the project task list
    if (!this.tasks[project].some(task => task.id === taskId)) {
      return render.logError(
        getMessage(errors.NO_TASK_IN_PROJECT, [taskId, project])
      )
    }
    return this.tasks[project].find(task => task.id === taskId)
  }

  /**
   *List all tasks in a project
   *
   * @param {Array<String>} input
   * @memberof TaskAPI
   */
  list (input) {
    let project = this.getProject(input)
    if (project) {
      render.drawProjectTaskList(this.tasks, project)
    }
  }

  /**
   *Edit task commit message
   *
   * @param {Array<String>} input
   * @memberof TaskAPI
   */
  edit (input) {
    const project = this.getProject(input)
    const taskId = parseInt(input[1])
    const newMessage = input.slice(2).join(' ')
    if (!taskId) {
      return render.logError(getMessage(errors.INVALID_TASK_ID_TYPE))
    }
    if (project) {
      if (!this.tasks[project].some(task => task.id === taskId)) {
        return render.logError(
          getMessage(errors.NO_TASK_IN_PROJECT, [taskId, project])
        )
      }
      const task = this.tasks[project].find(task => task.id === taskId)
      task.message = newMessage
      this.save()
    }
  }

  getProject (input) {
    let project = input[0]
    if (project === '.') {
      project = path.basename(process.cwd())
    }
    if (!this.tasks[project]) {
      return render.logError(getMessage(errors.INVALID_PROJECT_NAME, project))
    }
    return project
  }

  /**
   *Save the all tasks into the data file
   *
   * @memberof TaskAPI
   */
  save () {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.tasks))
    } catch (error) {
      render.logError(error)
    }
  }
}

module.exports = TaskAPI
