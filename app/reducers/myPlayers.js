'use strict'

import createReducer from '../utils/create-reducer'

import {PLAYER} from '../constant'

const initialState = {
  data: [
    // {
    //   isLogLoaded
    //   log
    // }
  ]
}

const actionHandler = {
  [PLAYER.LIST]: (state, action) => {
    return {
      data: action.data
    }
  },

  [PLAYER.LOG]: (state, action) => {
    let newState = Object.assign({}, state)
    const index = newState.data.find((player, index) => {
      if (player.id === action.id) {
        newState.data[index].log = action.data
        newState.data[index].isLogLoaded = true
        return true
      } 
    })
    return newState
  }
}

export default createReducer(initialState, actionHandler)
