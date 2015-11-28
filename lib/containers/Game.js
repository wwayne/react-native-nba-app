'use strict'

import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import moment from 'moment-timezone'
import React, {
  Component,
  Navigator,
  View,
  Text
} from 'react-native'

import actions from '../actions'
import GameList from '../components/game/GameList'
import GameNavigatorBar from '../components/share/GameNavigatorBar'

class Game extends Component {

  renderScene (route, navigator) {
    if (route.component) {
      const Component = route.component
      return <Component navigator={navigator} route={route} {...this.props} />
    }
  }

  render () {
    return (
      <Navigator 
        initialRoute={{
          name: 'GameList',
          component: GameList
        }}
        navigationBar={<GameNavigatorBar {...this.props} />}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }
}

export default connect(state => {
  return {
    live: state.live,
    over: state.over,
    unstart: state.unstart
  }
}, dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
})(Game)
