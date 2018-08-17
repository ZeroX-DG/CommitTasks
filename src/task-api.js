const fs = require('fs')
const os = require('os')
const path = require('path')

class taskAPI {
  constructor () {
    this.tasks = []
    try {
      const dataPath = path.join(os.homedir(), '.commit-tasks.json')
      if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]')
      }
      this.tasks = JSON.parse(fs.readFileSync(dataPath))
    } catch (error) {
      throw error
    }
  }
}

module.exports = taskAPI
