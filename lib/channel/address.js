'use strict'

const address = {
  /**
   * params gameDate yearmonthdate
   * example 20151125
   */
  scoreboard: (gameDate) => {
    return `http://data.nba.com/data/5s/json/cms/noseason/scoreboard/${gameDate}/games.json`
  },
  /**
   * params GameId
   */
  boxscore: (GameId, RangeType = 0, StartPeriod = 0, EndPeriod = 0, StartRange = 0, EndRange = 0) => {
    return `http://stats.nba.com/stats/boxscorescoring?GameID=${GameId}&RangeType=${RangeType}&StartPeriod=${StartPeriod}&EndPeriod=${EndPeriod}&StartRange=${StartRange}&EndRange=${EndRange}`
  }
}

export default address