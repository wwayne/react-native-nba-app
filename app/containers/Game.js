'use strict'

import React, {
  PropTypes,
  Component,
  Navigator
} from 'react-native'

import GameList from '../components/game/GameList'
import NavigatorBar from '../components/share/NavigatorBar'

export default class Game extends Component {

  componentDidMount () {
    const {actions} = this.props
    actions.getLeagueStanding()
  }

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
        navigationBar={<NavigatorBar />}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromRight
        })}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }
}

Game.propTypes = {
  game: PropTypes.object,
  actions: PropTypes.object
}
