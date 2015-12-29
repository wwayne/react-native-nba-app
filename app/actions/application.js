'use strict'

import { APP } from '../constant'

/**
 * Switch tab
 */
export function changeTab (tab) {
  return Promise.resolve({
    type: APP.TAB,
    data: tab
  })
}
