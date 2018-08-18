const exec = require('child_process').exec

function commit (message) {
  const commitCommand = `git add . && git commit -m "${message}"`
  return new Promise((resolve, reject) => {
    exec(commitCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

function getLastCommitDetails () {
  const getOutputCommand =
    'git log --format="%Cgreen%h%Creset %s %C(bold blue)<%an>%Creset" -n 1'
  return new Promise((resolve, reject) => {
    exec(getOutputCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout)
      }
    })
  })
}

function isNothingtoCommit () {
  const nothingToCommitCommand = 'git status --porcelain'
  return new Promise((resolve, reject) => {
    exec(nothingToCommitCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve(!stdout.match(/[a-z]/i))
      }
    })
  })
}

module.exports = {
  commit,
  getLastCommitDetails,
  isNothingtoCommit
}
