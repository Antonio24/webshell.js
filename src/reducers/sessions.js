'use strict'

const CommandError = require('../errors')

exports.LOGIN = (state, action) => {
  if (action.userName === '') throw new CommandError.InvalidParameter(action.userName)
  const sessions = state.sessions.concat([String(action.userName)])
  return Object.assign({}, state, {sessions})
}

exports.LOGOUT = (state, action) => {
  const sessions = state.sessions.slice(0, -1)
  return Object.assign({}, state, {sessions})
}
