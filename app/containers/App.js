'use strict'

import React, { 
  Component,
  View,
  StyleSheet
} from 'react-native'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'

import allActions from '../actions'
import {APP} from '../constant'

import Game from './Game'
import Player from './Player'

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
    const {game, player, actions} = this.props

    return (
      <View style={styles.container}>
        {tab === 'game' && 
          <Game {...game} actions={actions} />
        }
        {tab === 'players' &&
          <Player {...player} actions={actions} />
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

export default connect(state => {
  return {
    application: state.application,
    game: {
      live: state.live,
      over: state.over,
      unstart: state.unstart,
      standing: state.standing
    },
    player: {}
  }
}, dispatch => {
  return {
    actions: bindActionCreators(allActions, dispatch)
  }
})(App)
