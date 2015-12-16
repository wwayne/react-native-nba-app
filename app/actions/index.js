'use strict'

import {getGameGeneral, getGameDetail, getLeagueStanding} from './game'
import {getMyPlayers} from './player'

const actions = {
  getGameGeneral,
  getGameDetail,
  getLeagueStanding,
  getMyPlayers
}

export default actions
