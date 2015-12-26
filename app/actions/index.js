'use strict'

import {getGameGeneral, getGameDetail, getLeagueStanding} from './game'
import {getMyPlayers, getPlayerLog} from './player'
import {changeTab} from './application'

const actions = {
  changeTab,
  getGameGeneral,
  getGameDetail,
  getLeagueStanding,
  getMyPlayers,
  getPlayerLog
}

export default actions
