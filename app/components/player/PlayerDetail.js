'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  PropTypes,
  Dimensions,
  InteractionManager
} from 'react-native'

import {Icon} from 'react-native-icons'
import teamInfo from '../../utils/team-map'
import PlayerLog from './PlayerLog'
import PlayerTrend from './PlayerTrend'

const navigationHeight = 30
const headerHeight = 120

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

    InteractionManager.runAfterInteractions(() => {
      actions.getPlayerDetail(player.id)
        .then(() => {
          actions.getPlayerLog(player.id)
        })
    })
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
    /* ScrollView need a specifical height */
    const scrollHeight = Dimensions.get('window').height - navigationHeight - headerHeight
    return (
      <View style={styles.container}>
        {player &&
          <View>
            <View style={[styles.navigation, {backgroundColor: teamInfo[team].color}]}>
              <TouchableHighlight
                onPress={this.onPressBack.bind(this)}
                underlayColor='transparent'>
                <Icon
                  name='ion|ios-arrow-left'
                  size={26}
                  color='#fff'
                  style={styles.backIcon} />
              </TouchableHighlight>
            </View>

            <View style={[styles.header, {backgroundColor: teamInfo[team].color}]}>
              <View style={styles.portraitView}>
                <Image style={styles.portrait} source={{uri: `http://stats.nba.com/media/players/230x185/${player.id}.png`}}/>
              </View>
              <Text style={styles.name}>{player.firstName + ' ' + player.lastName}</Text>
              <Text style={styles.jersey}>{player.jersey}</Text>
            </View>

            <ScrollView style={{height: scrollHeight}}>
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
              {player.log &&
                <View>
                  <PlayerLog data={player.log} />
                  <View style={styles.logDivider} />
                  <PlayerTrend data={player.log} color={teamInfo[team].color} />
                </View>
              }
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
    height: navigationHeight
  },
  backIcon: {
    height: 30,
    marginLeft: 6,
    marginTop: 6,
    width: 30
  },
  // Header part
  header: {
    height: headerHeight
  },
  portraitView: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 60,
    marginTop: 5,
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
    fontSize: 16,
    marginTop: 5
  },
  jersey: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 14
  },
  // Basic data
  basicData: {
    flexDirection: 'row',
    height: 28,
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
    fontSize: 19,
    fontWeight: '500',
    marginRight: 3
  },
  basicDataMark: {
    color: '#909CAF',
    fontSize: 12,
    position: 'relative',
    bottom: 1
  },
  // Divider
  logDivider: {
    backgroundColor: '#eee',
    height: 3,
    marginHorizontal: 10,
    marginVertical: 15
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
