'use strict'

const d = new Date()
const season = d.getFullYear().toString() + '-' + (d.getFullYear() + 1).toString().substring(2, 4)

const address = {
  /**
   * All game of the date
   * @params gameDate: {String} {Format: yearmonthdate}
   * @example gameDate: 20151125
   */
  gameGeneral: (gameDate) => {
    return `http://data.nba.com/data/5s/json/cms/noseason/scoreboard/${gameDate}/games.json`
  },
  /**
   * Detail of a game in a specific date
   * @params gameDate: {String} {Format: yearmonthdate} & gameId: {String}
   * @example gameDate: 20151128 & gameId: 0021500239
   */
  gameDetail: (gameDate, gameId) => {
    return `http://data.nba.com/data/10s/json/cms/noseason/game/${gameDate}/${gameId}/boxscore.json`
  },
  /**
   * Current league standing
   * @params year {String}
   * @example year: 2015
   */
  leagueStanding: (year) => {
    return `http://data.nba.com/data/json/cms/${year}/league/standings.json`
  },

  playerList: () => {
    return `http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=${season}`
  },

  playerInfo: (id) => {
    return `http://stats.nba.com/stats/commonplayerinfo?LeagueID=00&PlayerID=${id}&SeasonType=Regular+Season`
  },

  playerLog: (id) => {
    return `http://stats.nba.com/stats/playergamelog?LeagueID=00&PerMode=PerGame&PlayerID=${id}&Season=${season}&SeasonType=Regular+Season`
  }
}

export default address
