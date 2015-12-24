'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Dimensions
} from 'react-native'
import {Icon} from 'react-native-icons'

import PlayerSearch from './PlayerSearch'
import Collection from '../../lib/collection'
import PlayerTemplate from './PlayerTemplate'

export default class PlayerIndex extends Component {

  constructor (props) {
    super(props)
    this.state = {
      myPlayers: [],
      currentOrder: 0
    }
    this.screenWidth = Dimensions.get('window').width
  }

  componentDidMount () {
    const {actions} = this.props
    actions.getMyPlayers()
  }

  componentWillReceiveProps (props) {
    const {myPlayers} = props
    this.setState({
      myPlayers
    })
  }

  onPressAdd () {
    const {navigator} = this.props
    navigator.push({
      name: 'PlayerSearch',
      component: PlayerSearch
    })
  }

  scrollEnd (x, y) {
    const {screenWidth} = this
    
    this.setState({
      currentOrder: Math.floor(x / screenWidth)
    })
  }

  renderPlayer () {
    const {myPlayers, currentOrder} = this.state

    return myPlayers.data.map((player, index) => {
      return (
        <PlayerTemplate key={index} player={player} order={index} currentOrder={currentOrder} {...this.props}/>
      )
    })
  }

  render () {
    const {myPlayers} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.navigation}>
          <TouchableHighlight 
            onPress={this.onPressAdd.bind(this)} 
            underlayColor='transparent' 
            style={styles.addIcon}>
            <Icon
              name='ion|plus-round'
              size={20}
              color='#fff'
              style={styles.addIcon} />
          </TouchableHighlight>
        </View>
        {myPlayers.data &&
        <Collection style={styles.mainView} scrollEnd={this.scrollEnd.bind(this)}>
          {this.renderPlayer()}
        </Collection>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#465484',
    flex: 1
  },
  // Navigation
  navigation: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  addIcon: {
    height: 30,
    width: 30
  },
  // List
  mainView: {
    height: 10,
    backgroundColor: '#fff'
  }
})