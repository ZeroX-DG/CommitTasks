function pad (s, size) {
  while (s.length < size + 1) s = ' ' + s
  return s
}

function getMaxIdLength (tasks) {
  let max = 0
  tasks.forEach(task => {
    const idLength = (task.id + '').length
    if (idLength > max) {
      max = idLength
    }
  })
  return max
}

module.exports = { pad, getMaxIdLength }
