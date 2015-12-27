'use strict'

import { APP } from '../constant'

/**
 * Switch tab
 */
export function changeTab (tab) {
  return {
    type: APP.TAB,
    data: tab
  }
}
