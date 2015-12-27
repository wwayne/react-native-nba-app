'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  PropTypes
} from 'react-native'
import {Icon} from 'react-native-icons'

import teamInfo from '../../utils/team-map'
import PlayerSearch from './PlayerSearch'

export default class PlayerDetail extends Component {

  constructor (props) {
    super(props)
    this.state = {
      player: null
    }
  }

  componentDidMount () {
    const {player, order, actions} = this.props
    this.setState({
      player
    })
    /* load player's log if this is the first one */
    if (order === 0) actions.getPlayerLog(player.id)
  }

  componentWillReceiveProps (props) {
    const {order, currentOrder, player, actions} = props

    if (order === currentOrder) {
      if (!player.isLogLoaded) {
        return actions.getPlayerLog(player.id)
      }
      this.setState({
        player
      })
    }
  }

  onPressAdd () {
    const {navigator} = this.props
    navigator.push({
      name: 'PlayerSearch',
      component: PlayerSearch
    })
  }

  /**
   * all template will rceive props
   * but we just want to re-render the chosen one which `isLogLoaded` is false
   */
  shouldComponentUpdate (props, state) {
    const {order, currentOrder, player} = props
    return (order === currentOrder) && !player.isLogLoaded
  }

  render () {
    const {player} = this.props

    const team = player.team.toLowerCase()
    const nameForImage = player.firstName.toLowerCase() + '_' + player.lastName.toLowerCase()
    console.log(player)
    return (
      <View style={styles.container}>
        <View style={[styles.navigation, {backgroundColor: teamInfo[team].color}]}>
          <TouchableHighlight
            onPress={this.onPressAdd.bind(this)}
            underlayColor='transparent'
            style={styles.addIcon}>
            <Icon
              name='ion|plus-round'
              size={18}
              color='#fff'
              style={styles.addIcon} />
          </TouchableHighlight>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.header, {backgroundColor: teamInfo[team].color}]}>
            <View style={styles.portraitView}>
              <Image style={styles.portrait} source={{uri: `http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/statscube/players/large/${nameForImage}.png`}}/>
            </View>
            <Text style={styles.name}>{player.firstName + ' ' + player.lastName}</Text>
            <Text style={styles.jersey}>{player.jersey}</Text>
          </View>
          <View style={styles.basicData}>
            <View style={styles.basicDataBlock}>
              <Text style={styles.basicDataNumber}>{player.pts}</Text>
              <Text style={styles.basicDataMark}>Points</Text>
            </View>
            <View style={styles.basicDataBlock}>
              <Text style={styles.basicDataNumber}>{player.ast}</Text>
              <Text style={styles.basicDataMark}>Assists</Text>
            </View>
            <View style={styles.basicDataBlock}>
              <Text style={styles.basicDataNumber}>{player.reb}</Text>
              <Text style={styles.basicDataMark}>Rebounds</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  // Navigation
  navigation: {
    flexDirection: 'row',
    height: 30
  },
  addIcon: {
    height: 30,
    width: 30
  },
  // ScrollView
  scrollView: {
    flex: 1
  },
  // Header part
  header: {
    height: 110
  },
  portraitView: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 60,
    height: 60,
    width: 60
  },
  portrait: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  name: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15
  },
  jersey: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18
  },
  // Basic data
  basicData: {
    flexDirection: 'row',
    height: 25,
    justifyContent: 'center'
  },
  basicDataBlock: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 100
  },
  basicDataNumber: {
    color: '#909CAF',
    fontSize: 15,
    marginRight: 3
  },
  basicDataMark: {
    color: '#909CAF',
    fontSize: 12
  }
})

PlayerDetail.propTypes = {
  player: PropTypes.object,
  order: PropTypes.number,
  actions: PropTypes.object,
  navigator: PropTypes.object
}
