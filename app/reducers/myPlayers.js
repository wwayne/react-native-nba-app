'use strict'

import createReducer from '../utils/create-reducer'

import {PLAYER} from '../constant'

const initialState = {
  loaded: false,
  data: []
}

const actionHandler = {
  [PLAYER.LIST]: (state, action) => {
    return {
      loaded: true,
      data: action.data
    }
  }
}

export default createReducer(initialState, actionHandler)
