'use strict'

import createReducer from '../utils/create-reducer'

import {PLAYER} from '../constant'

const initialState = {
  isLoaded: false,
  data: []
}

const actionHandler = {
  [PLAYER.LIST]: (state, action) => {
    return {
      isLoaded: true,
      data: action.data
    }
  }
}

export default createReducer(initialState, actionHandler)
