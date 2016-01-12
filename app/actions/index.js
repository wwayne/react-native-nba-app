'use strict'

import {getGameGeneral, getGameDetail, getLeagueStanding} from './game'
import {getPlayerList, setSearchRecord, getSearchRecord, getPlayerDetail, getPlayerLog} from './player'
import {getTeamRank, getTeamInfo, getTeamDetail} from './team'
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
  getPlayerLog,
  getTeamRank,
  getTeamInfo,
  getTeamDetail
}

export default actions
