'use strict'

import { combineReducers } from 'redux'

import live from './live'
import over from './over'
import unstart from './unstart'
import standing from './standing'
import myPlayers from './myPlayers'

const reducers = combineReducers({
  unstart,
  live,
  over,
  standing,
  myPlayers
})

export default reducers
