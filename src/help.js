module.exports = `
  Usage:
    $ ct [<options> ...]

    Options:
        none             Display all tasks
      --task, -t         Create task
      --remove, --rm     Remove a task or a project
      --commit, -c       Commit a task
      --list, -l         Display all tasks in a project
      --find, -f         Search for a task
      --edit, -e         Edit a task commit's message
      --create, --cp     Create project for a task (use along with --task)
      --highlight, --hl  Highlight add task with a status
      --files            Used with --commit to specify files to be commited

    Examples:
      $ ct
      $ ct --task MyProject Fix issue #45
      $ ct --remove MyProject 1
      $ ct --remove . 1
      $ ct --commit MyProject 2
      $ ct --commit . 2
      $ ct --list MyProject
      $ ct --list .
      $ ct --find My task
      $ ct --edit MyProject 2 New message
      $ ct --edit . 2 New message
      $ ct --task NotExistProject Fix issue #45 --create
      $ ct --create --task NotExistProject Fix issue #45
      $ ct --highlight . 2 urgent
      $ ct --highlight . 2 important
      $ ct --highlight . 2 none
      $ ct --commit . 2 --files index.js src/main.jsx
`
