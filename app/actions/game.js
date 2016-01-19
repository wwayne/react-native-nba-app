'use strict'

import Channel from '../channel'
import { GAME } from '../constant'

/**
 * Get info of game general
 */
const getGameGeneral = (year, month, date) => {
  return (dispatch, getStore) => {
    if (getStore().application.navigator === 'gameIndex') {
      const channel = new Channel()
      return channel.getGameGeneral(year, month, date)
        .then(data => {
          return dispatch({
            type: GAME.INFO,
            data
          })
        })
    } else {
      return Promise.resolve()
    }
  }
}

/**
 * Grab detail of each game
 * @params id {String} && type {String}
 * @note id = game_id & tye = game_type
 * @return game {Object}
 */
const getGameDetail = (id, type, year, month, date) => {
  return (dispatch, getStore) => {
    if (getStore().application.navigator === 'gameDetail') {
      /* If the game is finish and have detail data, no need to request again */
      if (type === 'over') {
        const game = getStore().over.data.find((g) => { return g.id === id })
        if (game.detail && game.detail.loaded) {
          return Promise.resolve(dispatch({
            type: GAME.DETAIL,
            data: game.detail.data
          }))
        }
      }
      const channel = new Channel()
      return channel.getGameDetail(year, month, date, id)
        .then(data => {
          return dispatch({
            type: GAME.DETAIL,
            gameId: id,
            gameType: type,
            data
          })
        })
    } else {
      return Promise.resolve()
    }
  }
}

/**
 * Get every team's standing
 */
const getLeagueStanding = () => {
  return (dispatch, getStore) => {
    if (getStore().standing.loaded) {
      return Promise.resolve(dispatch({
        type: GAME.STANDING,
        data: getStore().standing.data
      }))
    }

    const d = new Date()
    const currentMonth = d.getMonth() + 1
    let year
    if (currentMonth >= 10) {
      year = d.getFullYear().toString()
    } else {
      year = d.getFullYear().toString() - 1
    }

    const channel = new Channel()
    return channel.getLeagueStanding(year)
      .then(data => {
        return dispatch({
          type: GAME.STANDING,
          data
        })
      })
  }
}

export default {
  getGameGeneral,
  getGameDetail,
  getLeagueStanding
}

