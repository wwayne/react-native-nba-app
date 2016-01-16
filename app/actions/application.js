'use strict'

import { APP } from '../constant'

/**
 * Switch tab
 */
const changeTab = (tab) => {
  return (dispatch) => {
    return Promise.resolve(dispatch({
      type: APP.TAB,
      data: tab
    }))
  }
}

export default {
  changeTab
}
