/**
 * ABORT: Customer component to use ios UserDeafults
 * @see https://facebook.github.io/react-native/docs/native-modules-ios.html#exporting-swift
 *
 * In order to support both platforms, a better choice is to use AsyncStore
 */

'use strict'

import {AsyncStorage} from 'react-native'

/* Only store string to store, easy for management */
const userDefaults = {
  set: (key, value) => {
    const jsonValue = JSON.stringify(value)
    return AsyncStorage.setItem(key, jsonValue)
  },

  get: (key) => {
    return AsyncStorage.getItem(key)
      .then(data => {
        if (data) return JSON.parse(data)
        return null
      })
  }
}

export default userDefaults
