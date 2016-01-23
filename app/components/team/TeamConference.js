'use strict'

/**
 * @note put ListView into scrollView cause warning
 * @see https://github.com/facebook/react-native/issues/1501
 * To remove the warning temporily,
 * comment the code in /node_modules/react-native/Libraries/Components/ScrollReponder.js line 204
 */
import React, {
  Component,
  PropTypes,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ListView,
  Dimensions
} from 'react-native'

import teamMap from '../../utils/team-map'
import TeamDetail from './TeamDetail'

/**
 * Give listView a specific height, or it will affected by parental ScrollView which has set pagingEnable=true
 * @see https://github.com/facebook/react-native/issues/3673
 */
const listHeight = Dimensions.get('window').height - 100 - 45

export default class TeamConference extends Component {

  constructor (props) {
    super(props)
    /* Switch team list to id based */
    let teamMapById = {}
    for (let key in teamMap) {
      teamMapById[teamMap[key].id] = Object.assign({}, teamMap[key], {abbr: key})
    }
    this.teamMapById = teamMapById
  }

  selectTeam (id) {
    const {navigator} = this.props
    navigator.push(Object.assign({}, {
      name: 'TeamDetail',
      component: TeamDetail,
      id
    }))
  }

  renderRow (item, _, index) {
    const team = Object.assign({}, this.teamMapById[item.id], item)
    const itemStyle = index % 2 === 0 ? styles.item : [styles.item, styles.itemEven]

    const teamLogo = team.abbr === 'hou' ? teamMap[team.abbr].logo2 : teamMap[team.abbr].logo

    return (
      <TouchableHighlight onPress={this.selectTeam.bind(this, team.id)} underlayColor='transparent'>
        <View style={itemStyle}>
          <View style={styles.order}>
            <Text style={styles.orderLabel}>{parseInt(index, 10) + 1}</Text>
          </View>
          <View style={styles.team}>
            <Text style={styles.teamCity}>{team.city}</Text>
            <Text style={styles.teamName}>{team.team}</Text>
          </View>
          <View style={styles.standing}>
            <Text style={styles.standingLabel}>{team.loss + ' - ' + team.win}</Text>
          </View>
          <View style={styles.logo}>
            <Image style={styles.logoImage} source={teamLogo} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    const {data} = this.props
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(data)

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.listView}
      />
    )
  }
}

const styles = StyleSheet.create({
  // List
  listView: {
    height: listHeight
  },
  // item
  item: {
    height: 70,
    flex: 1,
    flexDirection: 'row'
  },
  itemEven: {
    backgroundColor: '#F4F4F4'
  },
  // order
  order: {
    alignSelf: 'center',
    width: 50
  },
  orderLabel: {
    color: '#6B7C96',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  // team
  team: {
    flex: 5,
    justifyContent: 'center'
  },
  teamCity: {
    color: '#6B7C96',
    fontSize: 18,
    fontWeight: '200'
  },
  teamName: {
    color: '#909CAF',
    fontSize: 13
  },
  // Standing
  standing: {
    alignSelf: 'center',
    flex: 3
  },
  standingLabel: {
    color: '#6B7C96',
    textAlign: 'right'
  },
  // Logo
  logo: {
    alignSelf: 'center',
    flex: 3
  },
  logoImage: {
    alignSelf: 'center',
    height: 35,
    width: 35
  }
})

TeamConference.propTypes = {
  data: PropTypes.array,
  navigator: PropTypes.object
}
