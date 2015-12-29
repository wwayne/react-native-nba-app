'use strict'

import createReducer from '../utils/create-reducer'

import {APP} from '../constant'

const initialState = {
  tab: 'players'
}

const actionHandler = {
  [APP.TAB]: (state, action) => {
    return Object.assign({}, state, {
      tab: action.data
    })
  }
}

export default createReducer(initialState, actionHandler)
