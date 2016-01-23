'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  PropTypes,
  Dimensions,
  InteractionManager
} from 'react-native'

import {Icon} from 'react-native-icons'
import teamInfo from '../../utils/team-map'
import TeamDetailPlayer from './TeamDetailPlayer'

const listHeight = Dimensions.get('window').height - 30 - 90 - 35

export default class TeamDetail extends Component {

  constructor (props) {
    super(props)
    const {id} = this.props.route
    const {team} = this.props
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    if (team.detail[id] && team.detail[id].players) {
      dataSource = dataSource.cloneWithRows(team.detail[id].players)
    }

    this.state = {
      team: team.detail[id],
      dataSource
    }
  }

  componentDidMount () {
    const {actions} = this.props
    const {id} = this.props.route

    InteractionManager.runAfterInteractions(() => {
      actions.getTeamInfo(id)
      .then(() => {
        actions.getTeamDetail(id)
      })
    })
  }

  componentWillReceiveProps (props) {
    const {team} = props
    const {id} = this.props.route
    const {dataSource} = this.state

    let newState = {}
    if (team.detail[id].players) {
      newState = {
        team: team.detail[id],
        dataSource: dataSource.cloneWithRows(team.detail[id].players)
      }
    } else {
      newState = {
        team: team.detail[id]
      }
    }

    this.setState(newState)
  }

  onPressBack () {
    const {navigator} = this.props
    navigator.pop()
  }

  renderRow (player, _, index) {
    const {team, navigator} = this.props
    const {id} = this.props.route
    const isLast = index === team.detail[id].players.length - 1
    return <TeamDetailPlayer player={player} isLast={isLast} team={this.state.team} navigator={navigator} key={index}/>
  }

  render () {
    const {team, dataSource} = this.state
    return (
      <View style={styles.container}>
        {team &&
          <View>
            <View style={[styles.navigation, {backgroundColor: teamInfo[team.teamAbbr.toLowerCase()].color}]}>
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

            <View style={[styles.header, {backgroundColor: teamInfo[team.teamAbbr.toLowerCase()].color}]}>
              <View style={styles.headerTeam}>
                <Text style={styles.headerTeamCity}>{team.teamCity}</Text>
                <Text style={styles.headerTeamName}>{team.teamName}</Text>
              </View>
              <View style={styles.headerLogo}>
                <Image style={styles.headerLogoImage} source={teamInfo[team.teamAbbr.toLowerCase()].logo} />
              </View>
              <View style={styles.headerRank}>
                <Text style={styles.headerRankResult}>{team.win + 'W - ' + team.loss + 'L' }</Text>
                <Text style={styles.headerRankConf}>{'#' + team.confRank + ' in the ' + team.teamConf + ' Conference'}</Text>
                <Text style={styles.headerRankDivi}>{'#' + team.diviRank + ' in the ' + team.teamDivi + ' Division'}</Text>
              </View>
            </View>

            <View style={styles.dataInfo}>
              <View style={styles.dataInfoItem}>
                <Text style={styles.itemLabel}>PPG</Text>
                <Text style={styles.itemData}>{team.ptsRank + 'th'}</Text>
              </View>
              <View style={styles.dataInfoItem}>
                <Text style={styles.itemLabel}>RPG</Text>
                <Text style={styles.itemData}>{team.rebRank + 'th'}</Text>
              </View>
              <View style={styles.dataInfoItem}>
                <Text style={styles.itemLabel}>APG</Text>
                <Text style={styles.itemData}>{team.astRank + 'th'}</Text>
              </View>
              <View style={styles.dataInfoItem}>
                <Text style={styles.itemLabel}>OPPG</Text>
                <Text style={styles.itemData}>{team.oppRank + 'th'}</Text>
              </View>
            </View>

            {team.players &&
            <ListView
              dataSource={dataSource}
              renderRow={this.renderRow.bind(this)}
              style={styles.listView} />
            }
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
    marginLeft: 2,
    marginTop: 6,
    width: 30
  },
  // Header part
  header: {
    height: 90,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 15
  },
  // Heade team
  headerTeam: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  headerTeamCity: {
    color: '#fff',
    fontSize: 17
  },
  headerTeamName: {
    color: '#fff',
    fontSize: 13
  },
  // Header logo
  headerLogo: {
    flex: 1,
    justifyContent: 'center'
  },
  headerLogoImage: {
    alignSelf: 'flex-start',
    height: 70,
    width: 70
  },
  // Header rank
  headerRank: {
    flex: 1.5,
    justifyContent: 'center'
  },
  headerRankResult: {
    color: '#fff',
    fontSize: 10
  },
  headerRankConf: {
    color: '#fff',
    fontSize: 10
  },
  headerRankDivi: {
    color: '#fff',
    fontSize: 10
  },
  // Data info
  dataInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 35
  },
  dataInfoItem: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  itemLabel: {
    color: '#6B7C96',
    fontSize: 10
  },
  itemData: {
    color: '#6B7C96',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 2,
    position: 'relative',
    top: 2
  },
  // list view,
  listView: {
    backgroundColor: '#F4F4F4',
    height: listHeight
  }
})

TeamDetail.propTypes = {
  route: PropTypes.object,
  team: PropTypes.object,
  actions: PropTypes.object,
  navigator: PropTypes.object
}
