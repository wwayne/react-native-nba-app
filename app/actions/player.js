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
        const myData = data ? data : []
        const channel = new Channel()
        Promise.all(myData.map(id => {
          return channel.getPlayerInfo(id)
            .then(player => {
              player.isLogLoaded = false
              return player
            })
        }))
        .then(players => {
          return dispatch({
            type: PLAYER.LIST,
            data: players
          })
        })
        .catch(err => {
          console.log(err)
        })
      })
  }
}

export const getPlayerLog = (id) => {
  return (dispatch, getStore) => {
    const player = getStore().myPlayers.find(player => {
      return player.id === id
    })
    if (player.isLogLoaded) {
      return dispatch({
        type: PLAYER.LOG,
        data: player.log
      })
    }
    const channel = new Channel()
    channel.getPlayerLog(id)
      .then(data => {
        return dispatch({
          type: PLAYER.LOG,
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
          type: PLAYER.DETAIL,
          data
        })
      })
  }
}

export const removePlayer = () => {

}
