const errors = {
  INVALID_PROJECT_NAME: 'There are no projects named %s',
  INVALID_TASK_ID_TYPE: 'Task id is not a number',
  NO_TASK_IN_PROJECT: 'There is no task with the id %s in @%s',
  COMMIT_FINISHED_TASK: "You can't commit a finished task",
  NOTHING_TO_COMMIT: 'No changes to commit!'
}

const success = {
  REMOVED_TASK: 'Removed task %s in @%s',
  CREATED_TASK: 'Created task %s',
  COMITTED_TASK: 'Commited task % in @%s',
  EDITTED_TASK: 'Changed message to -> %s'
}

function getMessage (message, data) {
  if (!Array.isArray(data)) {
    data = [data]
  }
  data.forEach(item => (message = message.replace('%s', item)))
  return message
}

module.exports = {
  getMessage,
  errors,
  success
}
