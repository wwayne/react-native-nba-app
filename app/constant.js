'use strict'

/* Android env dosen't support Symbol, no idea about the reason */
// import Enum from 'es6-enum'

export const APP = {
  TAB: 'APP.TAB',
  'NAVIGATION': 'APP.NAVIGATION'
}
// Enum('TAB', 'NAVIGATION')

export const GAME = {
  INFO: 'GAME.INFO',
  DETAIL: 'GAME.DETAIL',
  STANDING: 'GAME.STANDING'
}
// Enum('INFO', 'DETAIL', 'STANDING')

export const PLAYER = {
  LIST: 'PLAYER.LIST',
  DETAIL: 'PLAYER.DETAIL',
  LOG: 'PLAYER.LOG',
  RECENT: 'PLAYER.RECENT'
}
// Enum('LIST', 'DETAIL', 'LOG', 'RECENT')

export const TEAM = {
  RANK: 'TEAM.RANK',
  INFO: 'TEAM.INFO',
  DETAIL: 'TEAM.DETAIL'
}
// Enum('RANK', 'INFO', 'DETAIL')
