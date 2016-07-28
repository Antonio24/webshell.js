'use strict'

const filesystem = require('../filesystem')

exports.CHANGE_LOCATION = (state, action) => {
  const path = action.path
  const tree = state.directoryStructure
  const target = filesystem.find(tree, path)
  if (!target) throw new Error('NOT_FOUND')
  if (!filesystem.isDirectory(tree, path)) throw new Error('NOT_A_DIRECTORY')
  return Object.assign({}, state, {currentLocation: path})
}

exports.CREATE_PATH = (state, action) => {
  const path = action.path
  const tree = state.directoryStructure
  if (filesystem.find(tree, path)) throw new Error('ALREADY_EXISTS')
  const newTree = filesystem.insert(tree, path, action.content)
  return Object.assign({}, state, {directoryStructure: newTree})
}