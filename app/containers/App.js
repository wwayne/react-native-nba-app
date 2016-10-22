'use strict'

import React, {
  Component,
  View,
  StyleSheet,
  PropTypes
} from 'react-native'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'

import applicationActions from '../actions/application'
import gameActions from '../actions/game'
import playerActions from '../actions/player'
import teamActions from '../actions/team'

import Game from './Game'
import Player from './Player'
import Team from './Team'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      tab: null
    }
  }

  componentWillReceiveProps (props) {
    const {application} = props
    this.setState({
      tab: application.tab
    })
  }

  render () {
    const {tab} = this.state
    const {game, player, team, gameActions, playerActions, teamActions} = this.props

    return (
      <View style={styles.container}>
        {tab === 'game' &&
          <Game {...game} actions={gameActions} />
        }
        {tab === 'players' &&
          <Player {...player} actions={playerActions} />
        }
        {tab === 'teams' &&
          <Team {...team} actions={teamActions} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

App.propTypes = {
  game: PropTypes.object,
  player: PropTypes.object,
  team: PropTypes.object,
  gameActions: PropTypes.object,
  playerActions: PropTypes.object,
  teamActions: PropTypes.object
}

export default connect(state => {
  return {
    application: state.application,
    game: {
      live: state.live,
      over: state.over,
      unstart: state.unstart,
      standing: state.standing,
      application: state.application
    },
    player: {
      playerList: state.playerList,
      playerLoaded: state.playerLoaded
    },
    team: {
      team: state.team,
      playerLoaded: state.playerLoaded
    }
  }
}, dispatch => {
  return {
    gameActions: bindActionCreators(Object.assign({}, applicationActions, gameActions), dispatch),
    playerActions: bindActionCreators(Object.assign({}, applicationActions, playerActions), dispatch),
    teamActions: bindActionCreators(Object.assign({}, applicationActions, playerActions, teamActions), dispatch)
  }
})(App)
