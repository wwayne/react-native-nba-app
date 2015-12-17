'use strict'

import userDefaults from '../lib/userDefaults'
import { APP, PLAYER } from '../constant'
import Channel from '../channel'

/**
 * Get player list that store in user defaults
 */
export const getMyPlayers = () => {
  return dispatch => {
    userDefaults.get(APP.MYPLAYERS)
      .then(data => {
        return dispatch({
          type: PLAYER.LIST,
          data
        })
      })
  }
}

export const addPlayer = (id) => {
  return dispatch => {
    const channel = new Channel()
    channel.getDetail(id)
      .then(data => {
        return dispatch({
          type. PLAYER.DETAIL,
          data
        })
      })
  }
}

export const removePlayer = () => {

}
