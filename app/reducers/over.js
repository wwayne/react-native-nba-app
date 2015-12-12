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
          score: {String}
        },
        visitor: {
          team: {String}
          score: {String}
        },
        detail: {
          url: {String}
          loaded: {Bool}
          data: {Object}
        }
      }
    */
  ]
}

const actionHandler = {
  [GAME.INFO]: (state, action) => {
    return Object.assign({}, state, {
      gameDate: action.data.gameDate,
      data: action.data.over
    })
  },

  [GAME.DETAIL]: (state, action) => {
    if (action.gameType !== 'over') return state
    let newState = Object.assign([], state)
    state.data.some(game => {
      if (game.id === action.gameId) {
        game.detail = game.detail || {}
        game.detail.loaded = true
        game.detail.data = action.data
        return true
      }
      return false
    })

    return newState
  }
}

export default createReducer(initialState, actionHandler)
