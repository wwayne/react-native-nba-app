'use strict'

import Enum from 'es6-enum'

export const APP = Enum('TAB', 'NAVIGATION')

export const GAME = Enum('INFO', 'DETAIL', 'STANDING')

export const PLAYER = Enum('LIST', 'DETAIL', 'LOG', 'RECENT')

export const TEAM = Enum('RANK', 'INFO', 'DETAIL')
