'use strict'

import { combineReducers } from 'redux'

import live from './live'
import over from './over'
import unstart from './unstart'
import standing from './standing'
import application from './application'

const reducers = combineReducers({
  unstart,
  live,
  over,
  standing,
  application
})

export default reducers
