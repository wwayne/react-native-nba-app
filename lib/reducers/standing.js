/**
 * Record each team's standing
 */

'use strict'

import createReducer from '../utils/create-reducer'

import {GAME} from '../constant'

const initialState = {
  loaded: false,
  data: {
    // teamId: {
    //   abbr: {String}
    //   state: {Object}
    // }
  }
}

const actionHandler = {
  [GAME.STANDING]: (state, action) => {
    return Object.assign({}, state, {
      loaded: true,
      data: action.data
    })
  }
}

export default createReducer(initialState, actionHandler)
