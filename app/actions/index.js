'use strict'

import {getGameGeneral, getGameDetail, getLeagueStanding} from './game'
import {getMyPlayers, getPlayerLog} from './player'

const actions = {
  getGameGeneral,
  getGameDetail,
  getLeagueStanding,
  getMyPlayers,
  getPlayerLog
}

export default actions
