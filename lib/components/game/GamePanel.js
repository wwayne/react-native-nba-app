'use strict'

import teamMap from '../../utils/team-map'
import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio
} from 'react-native'

import GameEach from './GameEach'

export default class GamePanel extends Component {

  static displayName = 'GamePanel'

  onPressRow () {
    const {navigator, game} = this.props
    if (game.type !== 'unstart') {
      navigator.push(Object.assign({}, {
        name: 'GameEach',
        component: GameEach,
        game
      }))
    }
  }

  render () {
    const {game, index} = this.props

    const homeAbb = game.home.team.toLowerCase()
    const visitorAbb = game.visitor.team.toLowerCase()

    let gameProcess = ''
    switch (game.type) {
      case 'unstart':
        gameProcess = game.date.replace(/\s*ET\s*/, '')
        break
      case 'live':
        gameProcess += game.process.quarter + ' '
        gameProcess += game.process.time.replace(/\s+/, '')
        break
      case 'over':
        gameProcess = 'Final'
        break
      default:
        return
    }

    let bg
    switch (index % 4) {
      case 0:
        bg = '#4893DF'
        break
      case 1:
        bg = '#D65350'
        break
      case 2:
        bg = '#5EAD42'
        break
      case 3:
        bg = '#F2B013'
        break
      default:
        return
    }
    return (
      <TouchableHighlight onPress={this.onPressRow.bind(this)} underlayColor="transparent">
        <View style={[styles.container, {backgroundColor: bg}]} >

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={{uri: homeAbb}}/>
            <Text style={styles.teamCity}>{teamMap[homeAbb].city}</Text>
            <Text style={styles.teamName}>{teamMap[homeAbb].team}</Text>
           
          </View>

          <View style={styles.gameInfo}>
            <Text style={styles.infoProcess}>{gameProcess}</Text>
            {game.type !== 'unstart' && 
              <View style={styles.infoScorePanel}>
                <Text style={styles.infoScore}>{game.home.score}</Text>
                <View style={styles.infoDivider}></View>
                <Text style={styles.infoScore}>{game.visitor.score}</Text>
              </View>
            }
          </View>

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={{uri: visitorAbb}}/>
            <Text style={styles.teamCity}>{teamMap[visitorAbb].city}</Text>
            <Text style={styles.teamName}>{teamMap[visitorAbb].team}</Text>
            
          </View>
          
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4893DF',
    flex: 1,
    flexDirection: 'row',
    height: 130
  },
  /* Team */
  team: {
    alignItems: 'center',
    flex: 2
  },
  teamLogo : {
    width: 63,
    height: 63,
    marginTop: 18
  },
  teamCity: {
    color: '#fff',
    fontSize: 11,
    marginTop: 1
  },
  teamName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    position: 'relative',
    top: -2
  },
  /* Info*/
  gameInfo: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  infoProcess: {
    color: '#fff',
    fontSize: 11,
    marginTop: 25,
    marginBottom: 5
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row'
  },
  infoScore: {
    color: '#fff',
    flex: 1,
    fontWeight: '100',
    fontSize: 33
  },
  infoDivider: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    width: 2 / PixelRatio.get(),
    height: 25
  }
})
