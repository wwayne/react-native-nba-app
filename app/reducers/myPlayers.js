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
  }
}

export default createReducer(initialState, actionHandler)
