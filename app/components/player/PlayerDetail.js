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

export default class PlayerDetail extends Component {

  constructor (props) {
    super(props)
    this.state = {
      player: null
    }
  }

  componentDidMount () {
    const {actions} = this.props
    const {player} = this.props.route

    actions.getPlayerDetail(player.id)
    actions.getPlayerLog(player.id)
  }

  componentWillReceiveProps (props) {
    const {playerLoaded} = props
    const {player} = this.props.route

    this.setState({
      player: playerLoaded[player.id]
    })
  }

  onPressBack () {
    const {navigator} = this.props
    navigator.pop()
  }

  render () {
    const {route, playerLoaded} = this.props
    const player = playerLoaded[route.player.id] || this.state.player

    const team = player && player.team.toLowerCase()
    const nameForImage = player && player.firstName.toLowerCase() + '_' + player.lastName.toLowerCase()

    return (
      <View style={styles.container}>
        {player &&
          <View>
            <View style={[styles.navigation, {backgroundColor: teamInfo[team].color}]}>
              <TouchableHighlight
                onPress={this.onPressBack.bind(this)}
                underlayColor='transparent'
                style={styles.addIcon}>
                <Icon
                  name='ion|ios-arrow-left'
                  size={18}
                  color='#fff'
                  style={styles.backIcon} />
              </TouchableHighlight>
            </View>

            <View style={[styles.header, {backgroundColor: teamInfo[team].color}]}>
              <View style={styles.portraitView}>
                <Image style={styles.portrait} source={{uri: `http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/statscube/players/large/${nameForImage}.png`}}/>
              </View>
              <Text style={styles.name}>{player.firstName + ' ' + player.lastName}</Text>
              <Text style={styles.jersey}>{player.jersey}</Text>
            </View>

            <ScrollView style={styles.scrollView}>
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
        }
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
  backIcon: {
    height: 30,
    marginLeft: 5,
    marginTop: 5,
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
  navigator: PropTypes.object,
  route: PropTypes.object,
  playerLoaded: PropTypes.object
}
