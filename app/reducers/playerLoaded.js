'use strict'

import createReducer from '../utils/create-reducer'

import {PLAYER} from '../constant'

const initialState = {
  // id: {isLogLoaded, log, ...}
}

const actionHandler = {
  [PLAYER.DETAIL]: (state, action) => {
    const data = state[action.id] ? Object.assign(state[action.id], action.data) : action.data
    return {
      [action.id]: data
    }
  },

  [PLAYER.LOG]: (state, action) => {
    const actionData = {
      log: action.data
    }
    const data = state[action.id] ? Object.assign(state[action.id], actionData) : actionData
    return {
      [action.id]: data
    }
  }
}

export default createReducer(initialState, actionHandler)
