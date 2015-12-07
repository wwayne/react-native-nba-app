'use strict'

import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import React, {
  Component,
  Navigator
} from 'react-native'

import actions from '../actions'
import PlayerIndex from '../components/player/PlayerIndex'
import NavigatorBar from '../components/share/NavigatorBar'

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
          name: 'PlayerIndex',
          component: PlayerIndex
        }}
        navigationBar={<NavigatorBar />}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }
}

export default connect(state => {
  return {
  }
}, dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
})(Player)
