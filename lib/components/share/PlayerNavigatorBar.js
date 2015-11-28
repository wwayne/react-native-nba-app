'use strict'

import React, {
  StyleSheet,
  View,
  Text
} from 'react-native'

import NavigatorBar from './NavigatorBar'

export default class GameNavigatorBar extends NavigatorBar {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }

  render () {
    const {presentedIndex} = this.state
    const {date, gameCount, navState} = this.props

    return (
      <View style={styles.container}>
        <Text>Search</Text>
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
