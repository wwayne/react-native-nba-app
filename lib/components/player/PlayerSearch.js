'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} from 'react-native'
import {Icon} from 'react-native-icons'

import PlayerPanel from './PlayerPanel'

export default class PlayerSearch extends Component {

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      playerList: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
    this.inputDelay = null
    this.playerList = require('../../../data/players.json')
  }

  onBackPress () {
    const {navigator} = this.props
    navigator.pop()
  }

  onInput (text) {
    this.setState({
      text
    })
    clearTimeout(this.inputDelay)
    this.inputDelay = setTimeout(() => {
      this.getResult(text)
    }, 1500)
  }

  getResult (text) {
    const {dataSource} = this.state
    const reg = new RegExp(text, 'i')
    let fullName
    let rows = []

    if (text.length > 0) {
      rows = this.playerList.filter(ele => {
        fullName = ele.firstName + ' ' + ele.lastName
        return reg.test(fullName)
      })
    }

    this.setState({
      dataSource: dataSource.cloneWithRows(rows)
    })
  }

  renderRow (player, _, index) {
    return (<PlayerPanel player={player} index={index} {...this.props}/>)
  }

  render () {
    const {text, dataSource} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.navigation}>
           <TouchableHighlight onPress={this.onBackPress.bind(this)} underlayColor='transparent' style={styles.backNav}>
            <Icon name='ion|ios-arrow-left' size={28} color='#fff' style={styles.backNav} />
          </TouchableHighlight>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onInput.bind(this)}
            keyboardType={'default'}
            value={text}
          />
        </View>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#465484'
  },
  // Navigation
  navigation: {
    flexDirection: 'row',
    height: 45
  }, 
  backNav: {
    height: 30,
    width: 30
  },
  textInput: {
    height: 40, 
    backgroundColor: '#fff',
    borderColor: 'gray', 
    borderWidth: 1,
    width: 200
  },
  // List
  listView: {
    backgroundColor: '#465484',
    height: 400,
    flex: 1
  },
})
