'use strict'

import address from './address'
import producer from './producer'

const fetchData = (site, channel, program) => {
  return fetch(site)
    .then(res => { return res.text() })
    .then(body => {
      return parseHtml(channel, program)(body)
    })
}

export default class Channel {
  /**
   * @Init
   * @channel is the website for grabing state
   * @program is the tab item
   */
  constructor (channel, program, options) {
    this.channel = channel
    this.program = program
    this.options = options
  }

  getGameGeneral (year, month, date) {
    const sb_url = address.scoreboard(`${year}${month}${date}`)
    return fetch(sb_url)
      .then(res => res.json())
      .then(data => {
        const allGames = producer.gameGeneral(data)
        if(allGames.live.length + allGames.unstart.length + allGames.over.length === 0) {
          return this.getGameGeneral(year, month, parseInt(date, 10) + 1)
        }
        allGames.gameDate = `${year}-${month}-${date}`
        return allGames
      })
  }

  getGameDetail (gameId) {
    const bs_url = address.boxscore(gameId)
    return fetch(bs_url)
      .then(res => res.json())
      .then(data => producer.gameDetail(data))
  }
}
