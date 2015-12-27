'use strict'

import address from './address'
import producer from './producer'

export default class Channel {

  constructor (options) {
    this.options = options
  }

  getGameGeneral (year, month, date) {
    const gen_url = address.gameGeneral(`${year}${month}${date}`)
    return window.fetch(gen_url)
      .then(res => res.json())
      .then(data => {
        const allGames = producer.gameGeneral(data)
        if (allGames.live.length + allGames.unstart.length + allGames.over.length === 0) {
          return this.getGameGeneral(year, month, parseInt(date, 10) + 1)
        }
        allGames.gameDate = `${year}-${month}-${date}`
        return allGames
      })
  }

  getGameDetail (year, month, date, gameId) {
    const det_url = address.gameDetail(`${year}${month}${date}`, gameId)
    return window.fetch(det_url)
      .then(res => res.json())
      .then(data => producer.gameDetail(data))
  }

  getLeagueStanding (year) {
    const stand_url = address.leagueStanding(year)
    return window.fetch(stand_url)
      .then(res => res.json())
      .then(data => producer.leagueStanding(data))
  }

  getPlayerList () {
    const url = address.playerList()
    return window.fetch(url)
      .then(res => res.json())
      .then(data => producer.playerList(data))
  }

  getPlayerInfo (id) {
    const url = address.playerInfo(id)
    return window.fetch(url)
      .then(res => res.json())
      .then(data => producer.playerInfo(data))
  }

  getPlayerLog (id) {
    const url = address.playerLog(id)
    return window.fetch(url)
      .then(res => res.json())
      .then(data => producer.playerLog(data))
  }
}
