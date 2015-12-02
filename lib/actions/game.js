'use strict'

import moment from 'moment-timezone'

import Channel from '../channel'
import { GAME } from '../constant'
const dateString = moment.tz(Date.now(), 'America/Los_Angeles').format()
const dateArray = dateString.replace('T', '-').split('-')

/**
 * Get info of game general
 */
export function getGameGeneral () {
  return (dispatch, getStore) => {
    const channel = new Channel()

    channel.getGameGeneral(dateArray[0], dateArray[1], '01')
      .then(data => {
        return dispatch({
          type: GAME.INFO,
          data
        })
      })
  }
}

/**
 * Grab detail of each game
 * @params id {String} && type {String}
 * @note id = game_id & tye = game_type
 * @return game {Object}
 */
export function getGameDetail (id, type) {
  return (dispatch, getStore) => {
    /* If the game is finish and have detail data, no need to request again */
    if (type === 'over') {
      const game = getStore().over.data.find((g) => { return g.id === id })
      if (game.detail && game.detail.loaded) {
        return dispatch({
          type: GAME.DETAIL,
          data: game.detail.data
        })
      }
    }

    const channel = new Channel()
    return channel.getGameDetail(dateArray[0], dateArray[1], '01', id)
      .then(data => {
        return dispatch({
          type: GAME.DETAIL,
          gameId: id,
          gameType: type,
          data
        })
      })
  }
}

/**
 * Get every team's standing
 */
export function getLeagueStanding () {
  return (dispatch, getStore) => {
    if (getStore().standing.loaded) {
      return dispatch({
        type: GAME.STANDING,
        data: getStore().standing.data
      })
    }

    const channel = new Channel()
    return channel.getLeagueStanding(dateArray[0])
      .then(data => {
        return dispatch({
          type: GAME.STANDING,
          data
        })
      })
  }
}
