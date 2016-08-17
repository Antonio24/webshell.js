'use strict'

const assert = require('assert')
const rm = require('../../../src/commands/rm')
const filesystem = require('../../../src/filesystem')
const createEnv = require('../../testingEnv')
const CommandError = require('../../../src/errors')

describe('#rm (remove)', () => {
  it('should remove a file', () => {
    const env = createEnv()
    const input = ['/etc/hosts']
    rm(input, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, ['etc', 'hosts'])
    assert.deepEqual(result, undefined)
  })

  it('should remove a directory', () => {
    const env = createEnv()
    const input = ['/etc']
    rm(input, env.buffer.print, env.frozenState, env.dispatch)
    const result = filesystem.find(env.store.getState().fileTree, ['etc'])
    assert.deepEqual(result, undefined)
  })

  it('should remove multiple things', () => {
    const env = createEnv()
    const input = ['/etc', '/usr/local']
    rm(input, env.buffer.print, env.frozenState, env.dispatch)
    const result1 = filesystem.find(env.store.getState().fileTree, ['etc'])
    assert.deepEqual(result1, undefined)
    const result2 = filesystem.find(env.store.getState().fileTree, ['usr', 'local'])
    assert.deepEqual(result2, undefined)
  })

  it('shouldn’t do anything, if path does not exist', () => {
    const env = createEnv()
    const input = ['/etc', '/this/path/does/not/exist']
    assert.throws(() => {
      rm(input, env.buffer.print, env.frozenState, env.dispatch)
    }, CommandError.PathNotExists)
    assert.deepEqual(env.store.getState(), env.frozenState)
  })
})
