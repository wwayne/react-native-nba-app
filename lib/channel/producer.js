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
          break;
        case 2:
          // Live
          item.type = 'live'
          item.process = {
            time: process.game_clock || 'End',
            quarter: 'Q' + process.period_value
          }
          result.live.push(item)
          break;
        case 3:
          // Over
          item.type = 'over'
          result.over.push(item)
          break;
        default:
          return
      }
    })

    return result
  },

  /**
   * @return {home: {players: {Array}, team, score}, visitor: {<=same}, general: {process}}
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
    console.log(res)
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
    
    return result
  },

  /**
   * @return {teamId: { name, states:{} }}
   */
  leagueStanding: (res) => {
    /* data is a array of all teams */
    const data = res.sports_content.standings.team
    let result

    data.forEach(team => {
      result[team.id] = result[team.id] || {}
      result[team.id].abbr = team.abbreviation
      result[team.id].state = team.team_stats
    })

    return result
  }
}

export default producer