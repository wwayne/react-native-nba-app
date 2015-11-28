'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native'

export default class PlayInGame extends Component {
  render () {
    const {player} = this.props

    const rows = Object.keys(player).map((key, index) => {
      return (
        <View key={index}>
          <Text>{key}</Text>
          <Text>{player[key]}</Text>
        </View>
      )
    })

    return (
      <View style={styles.container}>
        {rows}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
})