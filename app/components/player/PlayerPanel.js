'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native'

export default class PlayerPanel extends Component {

  onPress () {
    const {player} = this.props
    console.log(player.playerId)
  }

  render () {
    const {player} = this.props

    return (
      <View style={styles.container}>
        <Text>{player.firstName + ' ' + player.lastName}</Text>
        <Text onPress={this.onPress.bind(this)}>Add</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 20,
    flexDirection: 'row'
  }
})
