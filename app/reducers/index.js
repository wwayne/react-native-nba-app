'use strict'

import { combineReducers } from 'redux'

import live from './live'
import over from './over'
import unstart from './unstart'
import standing from './standing'
import myPlayers from './myPlayers'
import currentPlayer from './currentPlayer'

const reducers = combineReducers({
  unstart,
  live,
  over,
  standing,
  myPlayers,
  currentPlayer
})

export default reducers
