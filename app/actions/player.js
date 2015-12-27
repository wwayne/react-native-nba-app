'use strict'

import {PLAYER} from '../constant'
import Channel from '../channel'
import userDefaults from '../lib/userDefaults'

export const getPlayerList = () => {
  return (dispatch, getStore) => {
    if (getStore().playerList.isLoaded) {
      return dispatch({
        type: PLAYER.LIST,
        data: getStore().playerList.data
      })
    }
    const channel = new Channel()
    channel.getPlayerList()
      .then(data => {
        return dispatch({
          type: PLAYER.LIST,
          data: data
        })
      })
      .catch(err => console.error(err))
  }
}

export const setSearchRecord = (player) => {
  return dispatch => {
    userDefaults.get(PLAYER.RECENT)
      .then(recent => {
        let originData = []
        if (recent.found) {
          originData = Object.assign([], recent.data)
        }

        /* If recent record has player && it is the first one, return */
        if (originData.find((data, index) => {
          return data.id === player.id && index === 0
        })) return

        if (originData.length === 10) originData.pop()
        originData.unshift(player)
        return userDefaults.set(PLAYER.RECENT, originData)
          .then(() => {
            return dispatch({
              type: PLAYER.RECENT,
              data: originData
            })
          })
      })
  }
}

export const getSearchRecord = (id) => {
  return dispatch => {
    userDefaults.get(PLAYER.RECENT)
      .then(recent => {
        let originData = []
        if (recent.found) {
          originData = Object.assign([], recent.data)
        }
        return dispatch({
          type: PLAYER.RECENT,
          data: originData
        })
      })
  }
}

export const getPlayerDetail = (id) => {
  return (dispatch, getStore) => {
    if (getStore().playerLoaded[id]) {
      return dispatch({
        type: PLAYER.DETAIL,
        data: getStore().playerLoaded[id],
        id
      })
    }
    const channel = new Channel()
    channel.getPlayerInfo(id)
      .then(data => {
        return dispatch({
          type: PLAYER.DETAIL,
          data,
          id
        })
      })
      .catch(err => console.error(err))
  }
}

export const getPlayerLog = (id) => {
  return (dispatch, getStore) => {
    if (getStore().playerLoaded[id] && getStore().playerLoaded[id].log) {
      return dispatch({
        type: PLAYER.LOG,
        data: getStore().playerLoaded[id].log,
        id
      })
    }
    const channel = new Channel()
    channel.getPlayerLog(id)
      .then(data => {
        return dispatch({
          type: PLAYER.LOG,
          data,
          id
        })
      })
      .catch(err => console.error(err))
  }
}

