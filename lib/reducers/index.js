'use strict'

import { combineReducers } from 'redux'

import live from './live'
import over from './over'
import unstart from './unstart'

const reducers = combineReducers({
  unstart,
  live,
  over
})

export default reducers
