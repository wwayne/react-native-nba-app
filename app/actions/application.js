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

/**
 * Navigation, now only used for gamelist to gamedetail
 * when enter game detail, game list should stop requesting data continuously
 */
const toNavigation = targetComponent => {
  return dispatch => {
    return Promise.resolve(dispatch({
      type: APP.NAVIGATION,
      data: targetComponent
    }))
  }
}

export default {
  changeTab,
  toNavigation
}
