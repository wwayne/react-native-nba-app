'use strict'

import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import React, {
  Component,
  Navigator,
  View,
  Text
} from 'react-native'

import actions from '../actions'
import PlayerList from '../components/player/PlayerList'
import PlayerNavigatorBar from '../components/share/PlayerNavigatorBar'

class Player extends Component {

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
          name: 'PlayerList',
          component: PlayerList
        }}
        navigationBar={<PlayerNavigatorBar {...this.props} />}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }
}

export default connect(state => {
  return {
    playList: state.playList,
    search: state.search
  }
}, dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  } 
})(Player)