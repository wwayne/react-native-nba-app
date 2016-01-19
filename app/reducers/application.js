'use strict'

import createReducer from '../utils/create-reducer'

import {APP} from '../constant'

/* First navigatore of each tab named [tab]Index */
const initialState = {
  tab: 'game',
  navigator: 'gameIndex'
}

const actionHandler = {
  [APP.TAB]: (state, action) => {
    return Object.assign({}, state, {
      tab: action.data,
      navigator: action.data + 'Index'
    })
  },

  [APP.NAVIGATION]: (state, action) => {
    return Object.assign({}, state, {
      navigator: action.data
    })
  }
}

export default createReducer(initialState, actionHandler)
