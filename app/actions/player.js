'use strict'

import {PLAYER} from '../constant'
import Channel from '../channel'

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

export const getPlayerLog = (id) => {
}

export const removePlayer = () => {

}
