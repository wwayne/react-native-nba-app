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
          data: {Object}
        },
        process: {
          time: {String}
          quarter: {String}
        }
      }
    */
  ]
}

const actionHandler = {
  [GAME.INFO]: (state, action) => {
    return Object.assign({}, state, {
      gameDate: action.data.gameDate,
      data: action.data.live
    })
  },

  [GAME.DETAIL]: (state, action) => {
    if (action.gameType !== 'live') return state
    let newState = Object.assign([], state)
    state.data.some(game => {
      if (game.id === action.gameId) {
        game.detail = game.detail || {}
        game.detail.data = action.data
        game.detail.loaded = true
        game.process = action.data.process
        game.home.score = action.data.home.score
        game.visitor.score = action.data.visitor.score
        return true
      }
      return false
    })
    return newState
  }
}

export default createReducer(initialState, actionHandler)
