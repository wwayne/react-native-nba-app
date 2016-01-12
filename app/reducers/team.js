/**
 * Team rank
 */

'use strict'

import createReducer from '../utils/create-reducer'
import {TEAM} from '../constant'

const initialState = {
  loaded: false,
  data: {
    eastern: [
      // {id, abbre, standing}
    ],
    western: []
  },
  detail: {}
}

const actionHandler = {
  [TEAM.RANK]: (state, action) => {
    return {
      loaded: true,
      data: action.data
    }
  },

  [TEAM.INFO]: (state, action) => {
    let detail = state.detail
    detail[action.id] = action.data
    return {
      detail
    }
  },

  [TEAM.DETAIL]: (state, action) => {
    let detail = state.detail
    detail[action.id] = detail[action.id] || {}
    detail[action.id].players = action.data
    return {
      detail
    }
  }
}

export default createReducer(initialState, actionHandler)
