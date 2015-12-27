'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ListView,
  TextInput,
  PropTypes
} from 'react-native'

import {Icon} from 'react-native-icons'
import Tabbar from '../share/Tabbar'

export default class PlayerIndex extends Component {

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
    this.playerList = null
    this.inputDelay = null
    this.mount = true
  }

  componentDidMount () {
    const {actions} = this.props
    actions.getPlayerList()
  }

  componentWillReceiveProps (props) {
    const {playerList} = props
    this.playerList = playerList.data
  }

  componentWillUnmount () {
    this.mount = false
  }

  onInput (text) {
    this.setState({
      text
    })
    /* Search after user stop typing */
    clearTimeout(this.inputDelay)
    this.inputDelay = setTimeout(() => {
      this.getResult(text)
    }, 1500)
  }

  getResult (text) {
    if (text.length > 0) {
      const {playerList} = this
      const {dataSource} = this.state

      const reg = new RegExp(text, 'i')
      const players = playerList.filter(player => {
        return reg.test(player.name)
      })
      this.setState({
        dataSource: dataSource.cloneWithRows(players)
      })
    }
  }

  renderRow (player, _, index) {
    return (
      <View style={styles.panel}>
        <View style={styles.panelLeft}>
          <Text style={styles.panelName}>{player.name}</Text>
          <Text style={styles.panelTeam}>{player.teamCity + ' ' + player.teamName}</Text>
        </View>
        <View style={styles.panelRight}>
          <Icon name='ion|ios-arrow-right' size={16} color='#6B7C96' style={styles.enterIcon} />
        </View>
      </View>
    )
  }

  render () {
    const {text, dataSource} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerInner}>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onInput.bind(this)}
              keyboardType={'default'}
              textAlignVertical={'center'}
              autoCorrect={false}
              placeholder={'Find player'}
              value={text}
            />
            <View style={styles.searchIconView}>
              <Icon name='ion|search' size={16} color='#fff' style={styles.searchIcon} />
            </View>
          </View>
        </View>
        <Tabbar tab={'players'} {...this.props}/>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.list}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // Header
  header: {
    alignItems: 'center',
    backgroundColor: '#E66840',
    flexDirection: 'row',
    height: 100
  },
  headerInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: '#BD4C29',
    borderWidth: 0,
    color: '#fff',
    fontSize: 14,
    height: 40,
    paddingLeft: 5,
    width: 260
  },
  searchIconView: {
    backgroundColor: '#BD4C29',
    width: 40,
    height: 40,
    position: 'relative'
  },
  searchIcon: {
    width: 16,
    height: 16,
    left: 20,
    marginLeft: -8,
    marginTop: -8,
    position: 'absolute',
    top: 20
  },
  // List
  list: {
    flex: 1
  },
  panel: {
    borderColor: '#979797',
    borderBottomWidth: 1,
    height: 55,
    flexDirection: 'row'
  },
  panelLeft: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  panelName: {
    color: '#6B7C96',
    fontSize: 17
  },
  panelTeam: {
    color: '#909CAF',
    fontSize: 13
  },
  panelRight: {
    height: 55,
    position: 'relative',
    width: 30
  },
  enterIcon: {
    height: 30,
    left: 15,
    marginLeft: -15,
    marginTop: -15,
    position: 'absolute',
    top: 27.5,
    width: 30
  }
})

PlayerIndex.propTypes = {
  actions: PropTypes.object
}
