'use strict'

import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Image,
  TouchableHighlight
} from 'react-native'
import teamMap from '../../utils/team-map'
import {Icon} from 'react-native-icons'

export default class GameDetail extends Component {
  constructor (props) {
    super(props)

    const {game} = props.route
    const homeAbb = game.home.team.toLowerCase()
    const visitorAbb = game.visitor.team.toLowerCase()

    const homeName = teamMap[homeAbb].city + ' ' + teamMap[homeAbb].team
    const visitorName = teamMap[visitorAbb].city + ' ' + teamMap[visitorAbb].team
    this.state = {
      interval: false,
      selectedIndex: 0,
      teamValues: [homeName, visitorName]
    }
  }

  componentDidMount () {
    const {actions, route} = this.props
    const game = route.game

    actions.getGameDetail(game.id, game.type)

    if (game.type === 'live') {
      clearInterval(this.state.interval)
      const interval = setInterval(() => {
        actions.getGameDetail(game.id, game.type)
      }, 10000)
      this.setState({
        interval
      })
    }
  }

  componentWillUnmount () {
    const {interval} = this.state
    clearInterval(interval)
  }

  onBackPress () {
    const {navigator} = this.props
    navigator.pop()
  }

  onChange (event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex
    })
  }

  render () {
    const {selectedIndex, teamValues} = this.state
    const {route} = this.props
    const game = route.game
    const homeAbb = game.home.team.toLowerCase()
    const visitorAbb = game.visitor.team.toLowerCase()

    /* Calcu for process and type */
    let gameProcess = ''
    let cssType = ''
    switch (game.type) {
      case 'live':
        gameProcess += game.process.quarter + ' '
        gameProcess += game.process.time.replace(/\s+/, '')
        cssType = 'Live'
        break
      case 'over':
        gameProcess = 'Final'
        cssType = 'Over'
        break
      default:
        return
    }

    /* Get standings of each team */
    const {standing} = this.props
    let homeStand = ''
    let visitorStand = ''

    if (standing.loaded) {
      const homeStandState = standing.data[game.home.id].state
      const visitorStandState = standing.data[game.visitor.id].state
      homeStand = homeStandState.wins + ' - ' + homeStandState.losses
      visitorStand = visitorStandState.wins + '-' + visitorStandState.losses
    }

    /* Current team chosen */
    const homeCss = selectedIndex === 0 ? 'Active' : 'Inactive'
    const visitorCss = selectedIndex === 1 ? 'Active' : 'Inactive'

    return (
      <View>
        {/* Navigation */}
        <View style={[ styles.nav, styles[`background${cssType}`] ]}>
          <TouchableHighlight onPress={this.onBackPress.bind(this)} underlayColor='transparent' style={{width: 80}}>
            <Icon name='ion|ios-arrow-left' size={30} color='#fff' style={styles.backNav} />
          </TouchableHighlight>
        </View>
        {/* Sum info */}
        <View style={[styles.sumContainer, styles[`background${cssType}`]]} >
          <View style={styles.team}>
            <Image style={styles.teamLogo} source={{uri: homeAbb}}/>
            <Text style={styles.teamCity}>{teamMap[homeAbb].city}</Text>
            <Text style={styles.teamName}>{teamMap[homeAbb].team}</Text>
            <Text style={styles.standing}>{homeStand}</Text>
          </View>

          <View style={styles.gameInfo}>
            <Text style={[styles.infoProcess, styles[`process${cssType}`]]}>{gameProcess}</Text>
            {game.type !== 'unstart' &&
              <View style={styles.infoScorePanel}>
                <View style={styles.infoScoreBlcok}>
                  <Text style={styles.infoSide}>Home</Text>
                  <Text style={styles.infoScore}>{game.home.score}</Text>
                </View>
                <View style={styles.infoDivider} />
                <View style={styles.infoScoreBlock}>
                  <Text style={styles.infoSide}>Away</Text>
                  <Text style={styles.infoScore}>{game.visitor.score}</Text>
                </View>
              </View>
            }
          </View>

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={{uri: visitorAbb}}/>
            <Text style={styles.teamCity}>{teamMap[visitorAbb].city}</Text>
            <Text style={styles.teamName}>{teamMap[visitorAbb].team}</Text>
            <Text style={styles.standing}>{visitorStand}</Text>
          </View>
        </View>
        {/* Switch */}
        <View style={styles.segment}>
          <TouchableHighlight onPress={this.onChange.bind(this, 0)} underlayColor='transparent'>
            <View style={[styles.segPanel, styles[`segPanel${homeCss}`]]}>
              <Text style={[styles.segTeam, styles[`segTeam${homeCss}`]]}>{teamValues[0]}</Text>
              <View style={homeCss === 'Active' ? {backgroundColor: teamMap[homeAbb].color} : {opacity: 0}} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onChange.bind(this, 1)} underlayColor='transparent'>
            <View style={[styles.segPanel, styles[`segPanel${visitorCss}`]]}>
              <Text style={[styles.segTeam, styles[`segTeam${visitorCss}`]]}>{teamValues[1]}</Text>
              <View style={visitorCss === 'Active' ? {backgroundColor: teamMap[visitorAbb].color} : {opacity: 0}} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

GameDetail.propTypes = {
  actions: PropTypes.object,
  route: PropTypes.object,
  navigator: PropTypes.object,
  standing: PropTypes.object
}

const styles = StyleSheet.create({
  // Navigation
  nav: {
    paddingTop: 13,
    paddingLeft: 5
  },
  backNav: {
    height: 15,
    width: 40
  },
  // Sum container
  sumContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 170
  },
  // Team
  team: {
    alignItems: 'center',
    flex: 1
  },
  teamLogo: {
    width: 95,
    height: 95,
    marginTop: 2
  },
  teamCity: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2
  },
  teamName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    position: 'relative',
    top: 0
  },
  backgroundLive: {
    backgroundColor: '#D65350'
  },
  backgroundOver: {
    backgroundColor: '#4D98E4'
  },
  standing: {
    color: '#fff',
    marginTop: 5
  },
  // Info
  gameInfo: {
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'column'
  },
  infoProcess: {
    color: '#fff',
    fontSize: 13,
    marginTop: 43,
    marginBottom: 3
  },
  processUnstart: {
    fontSize: 19,
    position: 'relative',
    top: 9
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row'
  },
  infoScoreBlock: {
    alignItems: 'center',
    flex: 1
  },
  infoScore: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '200',
    flex: 9,
    fontSize: 40
  },
  infoSide: {
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 10,
    flex: 1,
    marginTop: 6
  },
  infoDivider: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15,
    width: 2 / PixelRatio.get(),
    height: 65
  },
  // Segment
  segment: {},
  segPanel: {},
  segPanelActive: {},
  segPanelInactive: {},
  segTeam: {},
  segTeamActive: {},
  segTeamInactive: {}
})
