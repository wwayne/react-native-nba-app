'use strict'

import teamMap from '../../utils/team-map'
import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio
} from 'react-native'

import GameDetail from './GameDetail'

export default class GamePanel extends Component {
  onPressRow () {
    const {navigator, game} = this.props
    if (game.type !== 'unstart') {
      navigator.push(Object.assign({}, {
        name: 'GameDetail',
        component: GameDetail,
        game
      }))
    }
  }

  render () {
    const {game} = this.props

    const homeAbb = game.home.team.toLowerCase()
    const visitorAbb = game.visitor.team.toLowerCase()

    let gameProcess = ''
    let cssType = ''
    switch (game.type) {
      case 'unstart':
        gameProcess = game.date.replace(/\s*ET\s*/, '')
        cssType = 'Unstart'
        break
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

    return (
      <TouchableHighlight onPress={this.onPressRow.bind(this)} underlayColor='transparent'>
        <View style={[styles.container, styles[`background${cssType}`]]} >

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={{uri: homeAbb}}/>
            <Text style={styles.teamCity}>{teamMap[homeAbb].city}</Text>
            <Text style={styles.teamName}>{teamMap[homeAbb].team}</Text>
          </View>

          <View style={styles.gameInfo}>
            <Text style={[styles.infoProcess, styles[`process${cssType}`]]}>{gameProcess}</Text>
            {game.type !== 'unstart' &&
              <View style={styles.infoScorePanel}>
                <Text style={styles.infoScore}>{game.home.score}</Text>
                <View style={styles.infoDivider} />
                <Text style={styles.infoScore}>{game.visitor.score}</Text>
              </View>
            }
          </View>

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={{uri: visitorAbb}} />
            <Text style={styles.teamCity}>{teamMap[visitorAbb].city}</Text>
            <Text style={styles.teamName}>{teamMap[visitorAbb].team}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

GamePanel.propTypes = {
  navigator: PropTypes.object,
  game: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4893DF',
    flex: 1,
    flexDirection: 'row',
    height: 110,
    marginBottom: 15
  },
  // Team
  team: {
    alignItems: 'center',
    flex: 1.7
  },
  teamLogo: {
    width: 60,
    height: 60,
    marginTop: 10
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
  backgroundUnstart: {
    backgroundColor: '#EEB735'
  },
  backgroundOver: {
    backgroundColor: '#4D98E4'
  },
  // Info
  gameInfo: {
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'column'
  },
  infoProcess: {
    color: '#fff',
    fontSize: 10,
    marginTop: 28,
    marginBottom: 3
  },
  processUnstart: {
    fontSize: 22,
    position: 'relative',
    top: 10
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  infoScore: {
    color: '#fff',
    fontWeight: '100',
    fontSize: 34,
    textAlign: 'center',
    width: 50
  },
  infoDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 25,
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    width: 2 / PixelRatio.get()
  }
})
