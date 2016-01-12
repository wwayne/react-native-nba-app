'use strict'

import { combineReducers } from 'redux'

import live from './live'
import over from './over'
import unstart from './unstart'
import standing from './standing'
import application from './application'
import playerList from './playerList'
import playerLoaded from './playerLoaded'
import team from './team'

const reducers = combineReducers({
  unstart,
  live,
  over,
  standing,
  application,
  playerList,
  playerLoaded,
  team
})

export default reducers
