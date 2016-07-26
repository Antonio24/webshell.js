'use strict';

const process = require('../process')
const action = require('../actions')
const filesystem = require('../filesystem')

module.exports = (input, terminal, store) => {
  const path = process.path(input)
  const tree = store.getState().directoryStructure
  const location = path.slice(0, -1)
  if (!filesystem.isDirectory(tree, location)) {
    const pathString = '/' + path.join('/')
    terminal.print(pathString + ': No such file or directory')
    return
  }
  try {
    store.dispatch(action.createDirectory(path))
  } catch(e) {
    const pathString = '/' + path.join('/')
    if (e.message === 'ALREADY_EXISTS') terminal.print(pathString + ': File or folder already exists')
  }
}
