'use strict'

import React, {
  StyleSheet,
  View,
  Text
} from 'react-native'

import NavigatorBar from './NavigatorBar'

export default class GameNavigatorBar extends NavigatorBar {
  render () {
    const {presentedIndex} = this.state
    const {live, over, unstart, navState} = this.props
    const gameCount = live.data.length + over.data.length + unstart.data.length
    const gameDate = live.gameDate
    return (
      <View style={styles.container}>
      { presentedIndex === 0 &&
        <View>
          <Text>{gameDate}</Text>
          <Text>{gameCount + ' Games'}</Text>
        </View>
      }
      { presentedIndex > 0 &&
        <Text style={styles.leftButton} onPress={this.onPressBack.bind(this)}>Back</Text>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    flex: 1,
    flexDirection: 'row',
    height: 64,
    left: 0,
    right: 0,
    position: 'absolute',
    top: 0
  },
  leftButton: {
    flex: 1
  }
})
