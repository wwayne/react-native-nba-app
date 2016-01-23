'use strict'

import {PLAYER} from '../constant'
import Channel from '../channel'
import userDefaults from '../lib/userDefaults'

const getPlayerList = () => {
  return (dispatch, getStore) => {
    if (getStore().playerList.isLoaded) {
      return Promise.resolve(dispatch({
        type: PLAYER.LIST,
        data: getStore().playerList.data
      }))
    }
    const channel = new Channel()
    return channel.getPlayerList()
      .then(data => {
        return dispatch({
          type: PLAYER.LIST,
          data: data
        })
      })
      .catch(err => console.error(err))
  }
}

const setSearchRecord = player => {
  return dispatch => {
    return userDefaults.get(PLAYER.RECENT)
      .then(recent => {
        let originData = []
        if (recent) {
          originData = Object.assign([], recent)
        }

        /* If recent record has player, return */
        if (originData.find((data, index) => {
          return data.id === player.id
        })) return Promise.resolve()

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

const getSearchRecord = id => {
  return dispatch => {
    return userDefaults.get(PLAYER.RECENT)
      .then(recent => {
        let originData = []
        if (recent) {
          originData = Object.assign([], recent)
        }
        return dispatch({
          type: PLAYER.RECENT,
          data: originData
        })
      })
      .catch(err => {
        console.error('err', err)
      })
  }
}

const getPlayerDetail = id => {
  return (dispatch, getStore) => {
    if (getStore().playerLoaded[id]) {
      return Promise.resolve(dispatch({
        type: PLAYER.DETAIL,
        data: getStore().playerLoaded[id],
        id
      }))
    }
    const channel = new Channel()
    return channel.getPlayerInfo(id)
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

const getPlayerLog = id => {
  return (dispatch, getStore) => {
    if (getStore().playerLoaded[id] && getStore().playerLoaded[id].log) {
      return Promise.resolve(dispatch({
        type: PLAYER.LOG,
        data: getStore().playerLoaded[id].log,
        id
      }))
    }
    const channel = new Channel()
    return channel.getPlayerLog(id)
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

export default {
  getPlayerList,
  setSearchRecord,
  getSearchRecord,
  getPlayerDetail,
  getPlayerLog
}
