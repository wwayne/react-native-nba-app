'use strict'

const producer = {
  /**
   * return {live: [], unstart: [], over: []}
   */
  gameGeneral: (res) => {
    let result = {
      unstart: [],
      live: [],
      over: []
    }
    let item

    res['sports_content']['games']['game'].forEach((game, index) => {
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
        item[key]['id'] = game[key]['id']
        item[key]['team'] = game[key]['team_key']
        item[key]['score'] = game[key]['score']
      })

      const process = game['period_time']
      switch (parseInt(process.game_status, 10)) {
        case 1:
          // Unstart
          item.type = 'unstart'
          item.date = process.period_status
          result.unstart.push(item)
          break
        case 2:
          // Live
          item.type = 'live'
          let game_clock
          if (process.game_clock) {
            game_clock = parseInt(process.game_clock.split(':')[0], 10) < 10 ? '0' + process.game_clock : process.game_clock
          }
          item.process = {
            time: game_clock || 'End',
            quarter: 'Q' + process.period_value
          }
          result.live.push(item)
          break
        case 3:
          // Over
          item.type = 'over'
          result.over.push(item)
          break
        default:
          return
      }
    })

    return result
  },

  /**
   * @return {type, home: {players: {Array}, team, score}, visitor: {<=same}, process: {time, quarter}}
   * @example player
        assists: "1"
        blocks: "1"
        field_goals_attempted: "6"
        field_goals_made: "0"
        first_name: "Garrett"
        fouls: "1"
        free_throws_attempted: "2"
        free_throws_made: "1"
        jersey_number: "17"
        last_name: "Temple"
        minutes: "17"
        on_court: "1"
        person_id: "202066"
        player_code: "garrett_temple"
        plus_minus: "-4"
        points: "1"
        position_full: "Guard"
        position_short: "G"
        rebounds_defensive: "2"
        rebounds_offensive: "0"
        seconds: "12"
        starting_position: ""
        steals: "3"
        team_turnovers: ""
        three_pointers_attempted: "4"
        three_pointers_made: "0"
        turnovers: "0"
   */
  gameDetail: (res) => {
    const data = res.sports_content.game
    let result = {
      home: {},
      visitor: {}
    }
    Object.keys(result).forEach(side => {
      result[side].team = data[side].team_key
      result[side].score = data[side].score
      result[side].player = data[side].players.player
    })

    const gameType = parseInt(data['period_time'].game_status, 10)
    result.type = gameType === 3 ? 'over' : (gameType === 2 ? 'live' : 'unstart')

    if (result.type === 'live') {
      const process = data.period_time
      result.process = {
        time: process.game_clock || 'End',
        quarter: 'Q' + process.period_value
      }
    }
    return result
  },

  /**
   * @return {teamId: { name, states:{} }}
   */
  leagueStanding: (res) => {
    /* data is a array of all teams */
    const data = res.sports_content.standings.team
    let result = {}

    data.forEach(team => {
      result[team.id] = result[team.id] || {}
      result[team.id].abbr = team.abbreviation
      result[team.id].state = team.team_stats
    })
    return result
  },

  /**
   * @return [{firstName, lastName, name, id, teamId, teamCity, teamName, teamAbbr}]
   */
  playerList: (res) => {
    const data = res.resultSets[0].rowSet
    /* 2016.1-2016.9 is 2015 season */
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    let currentYear
    if (currentMonth >= 10) {
      currentYear = currentDate.getFullYear() + ''
    } else {
      currentYear = currentDate.getFullYear() - 1 + ''
    }

    let nameArray
    return data.filter(item => {
      return item[4] === currentYear
    }).map(item => {
      nameArray = item[1].split(', ')
      return {
        id: item[0],
        firstName: nameArray[1],
        lastName: nameArray[0],
        name: nameArray[1] + ' ' + nameArray[0],
        teamId: item[6],
        teamCity: item[7],
        teamName: item[8],
        teamAbbr: item[9]
      }
    })
  },

  /**
   * @return {id:, firstName, lastName,pts, ast, reb, team, jersey, height, weight, birthday, position, affiliation}
   */
  playerInfo: (res) => {
    const basicInfo = res.resultSets[0].rowSet[0]
    const gameInfo = res.resultSets[1].rowSet[0]
    return {
      id: basicInfo[0],
      firstName: basicInfo[1],
      lastName: basicInfo[2],
      pts: gameInfo[3],
      ast: gameInfo[4],
      reb: gameInfo[5],
      team: basicInfo[18],
      jersey: basicInfo[13],
      height: basicInfo[10],
      weight: basicInfo[11],
      birthday: basicInfo[6].split('T')[0],
      position: basicInfo[14],
      affiliation: basicInfo[9]
    }
  },

  /**
   * @return [{gameId, gameDate, matchup, result, min, pts, fg,
   * fgRate, threeP, threePRate, ft, ftRate, reb, ast, stl, blk, tov, foul, plusMinus}]
   */
  playerLog: (res) => {
    const logs = res.resultSets[0].rowSet

    return logs.map(item => {
      return {
        gameId: item[0],
        gameDate: item[3],
        matchup: item[4],
        result: item[5],
        min: item[6],
        pts: item[24],
        fg: item[7] + '-' + item[8],
        fgRate: item[9],
        threeP: item[10] + '-' + item[11],
        threePRate: item[12],
        ft: item[13] + '-' + item[14],
        ftRate: item[15],
        reb: item[18],
        ast: item[19],
        stl: item[20],
        blk: item[21],
        tov: item[22],
        foul: item[23],
        plusMinus: item[25]
      }
    })
  },

  /**
   * @return {eastern: [{id, name, win, loss}], western:[]}
   */
  teamRank: (res) => {
    const eastData = res.resultSets[4].rowSet
    const westData = res.resultSets[5].rowSet

    let eastern = []
    let western = []
    let anotherItem = {}
    eastData.forEach((item, index) => {
      eastern.push({
        id: item[0],
        name: item[5],
        win: item[8],
        loss: item[7]
      })
      anotherItem = westData[index]
      western.push({
        id: anotherItem[0],
        name: anotherItem[5],
        win: anotherItem[8],
        loss: anotherItem[7]
      })
    })

    return {
      eastern,
      western
    }
  },

  /**
   * @return {teamCity, teamName, teamAbbr, teamConf, teamDivi, confRank, diviRank,
   win, loss, id, ptsRank, rebRank, astRank, oppRank}
   */
  teamInfo: (res) => {
    const info = res.resultSets[0].rowSet[0]
    const dataInfo = res.resultSets[1].rowSet[0]
    return {
      teamCity: info[2],
      teamName: info[3],
      teamAbbr: info[4],
      teamConf: info[5],
      teamDivi: info[6],
      confRank: info[11],
      diviRank: info[12],
      win: info[8],
      loss: info[9],
      id: info[0],
      ptsRank: dataInfo[3],
      rebRank: dataInfo[5],
      astRank: dataInfo[7],
      oppRank: dataInfo[9]
    }
  },

  /**
   * @return [{id, name, gp, pts, reb, ast, min}]
   */
  teamDetail: (res) => {
    const target = res.resultSets[1].rowSet
    return target.map(player => {
      return {
        id: player[1],
        name: player[2],
        gp: player[3],
        pts: player[27],
        reb: player[19],
        ast: player[20],
        min: player[7]
      }
    })
  },

  /**
   * @return {id: {pos, height, weight, num, age}}
   */
  teamDetailBasic: (res) => {
    const target = res.resultSets[0].rowSet
    let result = {}
    target.forEach(player => {
      result[player[12]] = {
        pos: player[5],
        height: player[6],
        weight: player[7],
        num: player[4],
        age: player[9]
      }
    })
    return result
  }
}

export default producer
