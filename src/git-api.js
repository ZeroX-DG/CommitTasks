const exec = require('child_process').exec

function commit (message) {
  const commitCommand = `git commit -m "${message}"`
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

function addFiles (files) {
  files = typeof files === 'string' ? [files] : files
  const commitCommand = `git add ${files.join(' ')}`
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

function getLastCommitID () {
  const getLastCommitIDCommand = 'git log --format="%h" -n 1'
  return new Promise((resolve, reject) => {
    exec(getLastCommitIDCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout)
      }
    })
  })
}

function getLastCommitFiles () {
  return new Promise((resolve, reject) => {
    getLastCommitID().then(id => {
      const getCommitFiles = `git diff-tree --no-commit-id --name-only -r ${id}`
      exec(getCommitFiles, (error, stdout, stderr) => {
        if (error) {
          reject(error)
        } else {
          resolve(stdout.split('\n'))
        }
      })
    })
  })
}

module.exports = {
  commit,
  addFiles,
  getLastCommitDetails,
  isNothingtoCommit,
  getLastCommitFiles,
  getLastCommitID
}
