'use strict'

import React, {
  Component,
  StyleSheet,
  PropTypes,
  View,
  Text,
  ScrollView,
  ListView
} from 'react-native'

class PlayerRow extends Component {
  render () {
    const {player} = this.props
    console.log(player)
    return (
      <View style={styles.playerbox}>
        <Text style={styles.p2}>{player.jersey_number + ' ' + player.first_name.substring(0, 1) + '.' + player.last_name}</Text>
        <Text style={styles.p1}>{player.starting_position ? player.starting_position : '-'}</Text>
        <Text style={styles.p1}>{player.points}</Text>
        <Text style={styles.p1}>{player.assists}</Text>
        <Text style={styles.p1}>{parseInt(player.rebounds_defensive, 10) + parseInt(player.rebounds_offensive, 10)}</Text>
        <Text style={styles.p1}>{player.field_goals_made + ' - ' + player.field_goals_attempted}</Text>
        <Text style={styles.p1}>{player.blocks}</Text>
        <Text style={styles.p1}>{player.steals}</Text>
        <Text style={styles.p1}>{player.three_pointers_made + ' - ' + player.three_pointers_attempted}</Text>
        <Text style={styles.p1}>{player.free_throws_made + ' - ' + player.free_throws_attempted}</Text>
        <Text style={styles.p1}>{player.turnovers}</Text>
        <Text style={styles.p1}>{player.fouls}</Text>
        <Text style={styles.p1}>{player.plus_minus}</Text>
        <Text style={styles.p1}>{player.minutes}</Text>
      </View>
    )
  }
}

PlayerRow.propTypes = {
  player: PropTypes.object
}


export default class GamePlayers extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount () {
    const {detail} = this.props
    this.updateDataSource(detail)
  }

  componentWillReceiveProps (props) {
    const {detail} = props
    this.updateDataSource(detail)
  }

  updateDataSource (detail) {
    const {dataSource} = this.state
    let rows = Object.assign([], detail.player)
    rows.unshift({}) // unshift an empty object, use it as title row

    this.setState({
      dataSource: dataSource.cloneWithRows(rows)
    })
  }

  renderTitle (index) {
    return (
      <View style={styles.playerbox} key={index}>
        <Text style={styles.p2} />
        <Text style={styles.p1}>P</Text>
        <Text style={styles.p1}>PTS</Text>
        <Text style={styles.p1}>AST</Text>
        <Text style={styles.p1}>REB</Text>
        <Text style={styles.p1}>FG</Text>
        <Text style={styles.p1}>BLK</Text>
        <Text style={styles.p1}>STL</Text>
        <Text style={styles.p1}>3PT</Text>
        <Text style={styles.p1}>FT</Text>
        <Text style={styles.p1}>TO</Text>
        <Text style={styles.p1}>PF</Text>
        <Text style={styles.p1}>+/-</Text>
        <Text style={styles.p1}>MIN</Text>
      </View>
    )
  }

  renderRow (player, _, i) {
    console.log(player, i)
    const index = parseInt(i, 10)
    if (index === 0) {
      return this.renderTitle(index)
    }
    return (<PlayerRow player={player} key={index} />)
  }

  render () {
    const {dataSource} = this.state
    return (
      <ListView 
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.listView} />
    )
  }
}

GamePlayers.propTypes = {
  data: PropTypes.object
}

const styles = StyleSheet.create({
  // List
  listView: {
    flex: 25,
    flexDirection: 'column'
  },
  // Player box
  playerbox: {
    flex: 1,
    flexDirection: 'row',
    height: 50
  },
  p1: {
    flex: 1
  },
  p2: {
    flex: 2.5
  }
})
