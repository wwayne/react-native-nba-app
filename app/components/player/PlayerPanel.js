'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native'

import userDefaults from '../../lib/userDefaults'
import {APP} from '../../constant'

export default class PlayerPanel extends Component {

  constructor (props) {
    super(props)
    const {isSelected} = this.props
    this.state = {
      isSelected
    }
  }

  onPress () {
    const {player} = this.props
    const {isSelected} = this.state

    userDefaults.get(APP.MYPLAYERS)
      .then(data => {
        let newData = data ? Object.assign([], data) : []
        const id = player.playerId
        if (isSelected) {
          // Remove
          const index = newData.indexOf(id)
          newData.splice(index, 1)
        } else {
          // Add
          newData.push(id)
        }
        return userDefaults.set(APP.MYPLAYERS, newData)
          .then(data => {
            this.setState({
              isSelected: !isSelected
            })
          })
      })
  }

  render () {
    const {player} = this.props
    const {isSelected} = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.info}>{player.firstName + ' ' + player.lastName}</Text>
        <Text style={styles.button} onPress={this.onPress.bind(this)}>{isSelected ? 'Delete' : 'Add'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 20,
    flexDirection: 'row'
  },
  info: {
    flex: 4
  },
  button: {
    flex: 1
  }
})
