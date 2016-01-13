'use strict'

import React, {
  Component,
  Navigator
} from 'react-native'

import TeamList from '../components/team/TeamList'
import NavigatorBar from '../components/share/NavigatorBar'

export default class Team extends Component {

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
          name: 'TeamList',
          component: TeamList
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
