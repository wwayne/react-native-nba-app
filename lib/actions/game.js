'use strict'

import moment from 'moment-timezone'

import Channel from '../channel'
import { GAME } from '../constant'

/**
 * Get info of game general page
 */
export function initialGame () {
  return (dispatch, getStore) => {
    const channel = new Channel('nba', 'gameGeneral')

    const dateString = moment.tz(Date.now(), "America/Los_Angeles").format()
    const dateArray = dateString.replace('T', '-').split('-')

    channel.getGameGeneral(dateArray[0], dateArray[1], dateArray[2])
      .then(data => {
        return dispatch({
          type: GAME.INFO,
          data
        })
      })
  }
}

/**
 * Grab detail page of a game
 * @params id {String} && type {String} && url {String}
 * @return game {Object}
 */
export function getGameDetail (id, type) {
  return (dispatch, getStore) => {
    if (type === 'over') {
      const game = getStore().over.data.find((g) => { return g.id === id })
      if (game.detail && game.detail.loaded) {
        return dispatch({
          type: GAME.DETAIL,
          data: game.detail.data
        })
      }
    }

    const channel = new Channel('nba', 'gameDetail')
    return channel.getGameDetail(id)
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
