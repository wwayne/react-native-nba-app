'use strict'

import React, { Component } from 'react-native'
import { TabBarIOS } from 'react-native-icons'

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
      <TabBarIOS barTintColor='#303D6D' tintColor='#fff'>

        <TabBarIOS.Item
         title='GAME'
         iconName={'ion|social-dribbble-outline'}
         selected={selectedTab === 'game'}
         onPress={this.onPress.bind(this, 'game')}>
         <Game />
        </TabBarIOS.Item>

        <TabBarIOS.Item
         title='PLAYER'
         iconName={'ion|ios-star-outline'}
         selected={selectedTab === 'player'}
         onPress={this.onPress.bind(this, 'player')}>
         <Player />
        </TabBarIOS.Item>

      </TabBarIOS>
    )
  }
}
