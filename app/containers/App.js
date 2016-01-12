'use strict'

import React, {
  Component,
  View,
  StyleSheet,
  PropTypes
} from 'react-native'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'

import allActions from '../actions'

import Game from './Game'
import Player from './Player'
import Team from './Team'

export default class App extends Component {

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
    const {game, player, team, actions} = this.props

    return (
      <View style={styles.container}>
        {tab === 'game' &&
          <Game {...game} actions={actions} />
        }
        {tab === 'players' &&
          <Player {...player} actions={actions} />
        }
        {tab === 'teams' &&
          <Team {...team} actions={actions} />
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
  actions: PropTypes.object
}

export default connect(state => {
  return {
    application: state.application,
    game: {
      live: state.live,
      over: state.over,
      unstart: state.unstart,
      standing: state.standing
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
    actions: bindActionCreators(allActions, dispatch)
  }
})(App)
