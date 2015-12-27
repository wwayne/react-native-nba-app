'use strict'

import {getGameGeneral, getGameDetail, getLeagueStanding} from './game'
import {getPlayerList, setSearchRecord, getSearchRecord, getPlayerDetail, getPlayerLog} from './player'
import {changeTab} from './application'

const actions = {
  changeTab,
  getGameGeneral,
  getGameDetail,
  getLeagueStanding,
  getPlayerList,
  setSearchRecord,
  getSearchRecord,
  getPlayerDetail,
  getPlayerLog
}

export default actions
