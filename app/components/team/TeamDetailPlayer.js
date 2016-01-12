'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  PropTypes
} from 'react-native'

import teamInfo from '../../utils/team-map'
import PlayerDetail from '../player/PlayerDetail'

export default class TeamDetailPlayer extends Component {

  onPress () {
    const {navigator, player} = this.props
    navigator.push({
      name: 'PlayerDetail',
      component: PlayerDetail,
      player
    })
  }

  render () {
    const {player, team} = this.props
    const teamMap = teamInfo[team.teamAbbr.toLowerCase()]

    return (
      <TouchableHighlight
       onPress={this.onPress.bind(this)}
       underlayColor='transparent'>
        <View style={styles.container}>

          <View style={styles.portrait}>
            <View style={styles.portraitBackground}>
              <Image style={[styles.portraitImage, {borderColor: teamMap.color}]} source={{uri: `http://stats.nba.com/media/players/230x185/${player.id}.png`}} />
            </View>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoName}>{player.name}</Text>
            <Text style={styles.infoPosition}>{player.pos + ' ' + player.num}</Text>
          </View>

          <View style={styles.data}>
            <View style={styles.dataPerson}>
              <Text style={styles.dataPersonItem}>{'Age: ' + player.age}</Text>
              <Text style={styles.dataPersonItem}>{'Height: ' + player.height}</Text>
              <Text style={styles.dataPersonItem}>{'Weight: ' + player.weight}</Text>
            </View>
            <View style={styles.dataGame}>
              <View style={styles.dataGameItem}>
                <Text style={styles.dataGameItemData}>{player.pts}</Text>
                <Text style={styles.dataGameItemLabel}>PTS</Text>
              </View>
              <View style={styles.dataGameItem}>
                <Text style={styles.dataGameItemData}>{player.reb}</Text>
                <Text style={styles.dataGameItemLabel}>REB</Text>
              </View>
              <View style={styles.dataGameItem}>
                <Text style={styles.dataGameItemData}>{player.ast}</Text>
                <Text style={styles.dataGameItemLabel}>AST</Text>
              </View>
              <View style={styles.dataGameItem}>
                <Text style={styles.dataGameItemData}>{player.min}</Text>
                <Text style={styles.dataGameItemLabel}>MIN</Text>
              </View>
              <View style={styles.dataGameItem}>
                <Text style={styles.dataGameItemData}>{player.gp}</Text>
                <Text style={styles.dataGameItemLabel}>GP</Text>
              </View>
            </View>
          </View>

        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#E1E1E1',
    borderBottomWidth: 1,
    height: 60,
    flexDirection: 'row'
  },
  // Portrait
  portrait: {
    flex: 1,
    justifyContent: 'center'
  },
  portraitBackground: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    height: 36,
    width: 36
  },
  portraitImage: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 1
  },
  // Info
  info: {
    flex: 2,
    justifyContent: 'center'
  },
  infoName: {
    color: '#7C7C7C',
    fontSize: 12
  },
  infoPosition: {
    color: '#7C7C7C',
    fontSize: 12
  },
  // Data
  data: {
    flex: 5,
    justifyContent: 'center'
  },
  // Data persion
  dataPerson: {
    flexDirection: 'row'
  },
  dataPersonItem: {
    color: '#909CAF',
    fontSize: 10,
    marginRight: 10
  },
  // Data game
  dataGame: {
    flexDirection: 'row'
  },
  dataGameItem: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginRight: 10
  },
  dataGameItemData: {
    color: '#6B7C96',
    fontSize: 12,
    position: 'relative',
    top: 1
  },
  dataGameItemLabel: {
    color: '#6B7C96',
    fontSize: 9
  }
})

TeamDetailPlayer.propTypes = {
  player: PropTypes.object,
  team: PropTypes.object,
  navigator: PropTypes.object
}
