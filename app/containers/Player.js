'use strict'

import React, {
  Component,
  Navigator
} from 'react-native'

import PlayerIndex from '../components/player/PlayerIndex'
import NavigatorBar from '../components/share/NavigatorBar'

export default class Player extends Component {

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
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromRight
        })}
        navigationBar={<NavigatorBar />}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }
}
