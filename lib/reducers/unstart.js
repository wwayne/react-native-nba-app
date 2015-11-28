'use strict'

import createReducer from '../utils/create-reducer'

import {GAME} from '../constant'

const initialState = {
  data: [
    /*
      {
        id: {Number}
        type: {String}
        home: {
          team: {String}
        },
        visitor: {
          team: {String}
        },
        time: 'String'
      }
    */
  ]
}

const actionHandler = {
  [GAME.INFO]: (state, action) => {
    return Object.assign({}, state, {
      gameDate: action.data.gameDate,
      data: action.data.unstart
    })
  }
}

export default createReducer(initialState, actionHandler)
