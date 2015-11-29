'use strict'

import teamMap from '../../utils/team-map'
import React, {
  Component,
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Image
} from 'react-native'

export default class GameDetail extends Component {

  constructor (props) {
    super(props)
    this.state = {
      interval: false
    }
  }

  componentDidMount() {
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

  render () {
    const {route} = this.props
    const game = route.game
    const homeAbb = game.home.team.toLowerCase()
    const visitorAbb = game.visitor.team.toLowerCase()
    
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
  
    return (
      <View>
        <View>
          <Text onPress={this.onBackPress.bind(this)}>Back</Text>
        </View>

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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  /* Team */
  team: {
    alignItems: 'center',
    flex: 2
  },
  teamLogo : {
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
  backgroundLive : {
    backgroundColor: '#D65350'
  },
  backgroundOver : {
    backgroundColor: '#4D98E4'
  },
  /* Info*/
  gameInfo: {
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'column'
  },
  infoProcess: {
    color: '#fff',
    fontSize: 10,
    marginTop: 30,
    marginBottom: 3
  },
  processUnstart: {
    fontSize: 19,
    position: 'relative',
    top: 9,
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
