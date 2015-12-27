'use strict'

import {getGameGeneral, getGameDetail, getLeagueStanding} from './game'
import {getPlayerList, getPlayerLog} from './player'
import {changeTab} from './application'

const actions = {
  changeTab,
  getGameGeneral,
  getGameDetail,
  getLeagueStanding,
  getPlayerList,
  getPlayerLog
}

export default actions
