'use strict'

const producer = {
  /**
   * data from http://stats.nba.com/stats/scoreboard
   * return {live: [], unstart: [], over: []}
   */
  gameGeneral: (data) => {
    let res = {
      unstart: [],
      live: [],
      over: []
    }
    let item

    data['sports_content']['games']['game'].forEach((game, index) => {
      item = {
        id: game.id,
        home: {}, 
        visitor: {},
        detail: {
          loaded: false,
          data: {}
        }
      }

      const sides = ['home', 'visitor']
      sides.forEach(key => {
        item[key]['team'] = game[key]['team_key']
        item[key]['score'] = game[key]['score']
      })

      const process = game['period_time']
      switch (parseInt(process.game_status, 10)) {
        case 1:
          // Unstart
          item.type = 'unstart'
          item.date = process.period_status
          res.unstart.push(item)
          break;
        case 2:
          // Live
          item.type = 'live'
          item.process = {
            time: process.game_clock,
            quarter: 'Q' + process.period_value
          }
          res.live.push(item)
          break;
        case 3:
          // Over
          item.type = 'over'
          res.over.push(item)
          break;
        default:
          return
      }
    })

    return res
  },

  /**
   * data from http://stats.nba.com/stats/boxscorescoring
   * @return {home: {players, inactivePlayers, team, record, lineScore}, visitor: {<=same}}
   */
  gameDetail: (data) => {
    let res = {
      home: {
        players: [],
        inactivePlayers: []
      },
      visitor: {
        players: [],
        inactivePlayers: []
      }
    }

    const homeId = data.resultSets[0].rowSet[0][6]
    const visitorId = data.resultSets[0].rowSet[0][7]
    /* Team info */
    const info1 = data.resultSets[1].rowSet[0]
    const info2 = data.resultSets[1].rowSet[1]
    let choose1 = info1[3] === homeId ? res.home : res.visitor
    let choose2 = info1[3] === homeId ? res.visitor : res.home
    
    choose1.team = info1[4]
    choose2.team = info2[4]
    choose1.record = info1[6]
    choose2.record = info2[6]
    choose1.score = info1[21]
    choose2.score = info2[21]
    choose1.lineScore = info1.splice(7, 21)
    choose2.lineScore = info2.splice(7, 21)
    /* Player info */
    const playersResult = data.resultSets[4]
    const headers = playersResult.headers.slice(4)
    let player
    playersResult.rowSet.forEach(item => {
      player = {}
      item.slice(4).forEach((value, index) => {
        player[headers[index]] = value
      })

      if (item[1] === homeId) {
        res.home.players.push(player)
      } else {
        res.visitor.players.push(player)
      }
    })
    /* Inactive players */
    const inactivePlayers = data.resultSets[9]
    const inactiveHeaders = inactivePlayers.headers
    let inactivePlayer
    inactivePlayers.rowSet.forEach(item => {
      inactivePlayer = {}
      item.slice(0, 4).forEach((value, index) => {
        inactivePlayer[inactiveHeaders[index]] = value
      })

      if (item[4] === homeId) {
        res.home.inactivePlayers.push(inactivePlayer)
      } else {
        res.visitor.inactivePlayers.push(inactivePlayer)
      }
    })
    
    return res
  }
}

export default producer