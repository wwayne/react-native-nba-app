'use strict'

import userDefaults from '../lib/userDefaults'
import { APP, PLAYER } from '../constant'

/**
 * Get player list that store in user defaults
 */
export function getMyPlayers () {
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

