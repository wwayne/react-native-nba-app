'use strict'

import React, {
  Component,
  StyleSheet,
  TabBarIOS,
  View,
  Text
} from 'react-native'

import Game from './Game'
import Player from './Player'

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'game'
    }
  }

  onPress (tab) {
    this.setState({
      selectedTab: tab
    })
  }

  render() {
    const {selectedTab} = this.state

    return (
      <TabBarIOS>

        <TabBarIOS.Item
         title='Game'
         selected={selectedTab === 'game'}
         onPress={this.onPress.bind(this, 'game')}>
         <Game />
        </TabBarIOS.Item>

        <TabBarIOS.Item
         title='Player'
         selected={selectedTab === 'player'}
         onPress={this.onPress.bind(this, 'player')}>
         <Player />
        </TabBarIOS.Item>

      </TabBarIOS>
    )
  }
}
