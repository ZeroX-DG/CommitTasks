<h1 align="center">CommitTasks</h1>

<h4 align="center">
  Plan & commit your changes with ease :tada:
</h4>

<div class="center">
</div>

## About this project

CommitTasks is a small, robust cli for developers to plan and manage their git commits in multiple projects.
With just a few example, the users can plan, prepare and commit their changes with confident.

## Features

- Manage commit tasks in separated projects
- Search for tasks
- Simple & easy to use

## Install

```
npm install -g committasks
```

## Usage

```
$ ct --help

  Usage:
    $ ct [<options> ...]

    Options:
        none            Display all tasks
      --task, -t        Create task
      --remove, -rm     Remove a task
      --commit, -c      Commit a task
      --list, -l        Display all tasks in a project
      --find, -f        Search for a task
      --edit, -e        Edit a task commit's message
      --create, -cp     Create project for a task (use along with --task)

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
```
