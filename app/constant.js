'use strict'

import Enum from 'es6-enum'

export const APP = Enum('TAB')

export const GAME = Enum('INFO', 'DETAIL', 'STANDING')

export const PLAYER = Enum('LIST', 'DETAIL', 'LOG', 'RECENT')
