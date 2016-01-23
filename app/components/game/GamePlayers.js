'use strict'

import React, {
  Component,
  StyleSheet,
  PropTypes,
  Text,
  View,
  ScrollView,
  ListView
} from 'react-native'

class PlayerRow extends Component {
  render () {
    const {player, last} = this.props

    return (
      <View style={!last ? styles.playerBox : [styles.playerBox, styles.playerBoxLast] }>
        <View style={[styles.p2, styles.p2Name]}><Text style={styles.pName}>{player.first_name.substring(0, 1) + '.' + player.last_name}</Text></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.starting_position ? player.starting_position : '-'}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.points}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.assists}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{parseInt(player.rebounds_defensive, 10) + parseInt(player.rebounds_offensive, 10)}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.field_goals_made + ' - ' + player.field_goals_attempted}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.blocks}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.steals}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.three_pointers_made + ' - ' + player.three_pointers_attempted}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.free_throws_made + ' - ' + player.free_throws_attempted}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.turnovers}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.fouls}</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.plus_minus}</Text></View></View>
        <View style={[styles.p1, styles.lastP1]}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.minutes}</Text></View></View>
      </View>
    )
  }
}

PlayerRow.propTypes = {
  player: PropTypes.object,
  last: PropTypes.bool
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
      <View style={[styles.playerBox, styles.titleRow]} key={index}>
        <View style={styles.p2} />
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>P</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>PTS</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>AST</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>REB</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>FG</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>BLK</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>STL</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>3PT</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>FT</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>TO</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>PF</Text></View></View>
        <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>+/-</Text></View></View>
        <View style={[styles.p1, styles.lastP1]}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>MIN</Text></View></View>
      </View>
    )
  }

  renderRow (player, _, i) {
    const index = parseInt(i, 10)
    const {detail} = this.props

    if (index === 0) {
      return this.renderTitle(index)
    }
    return (<PlayerRow player={player} key={index} last={index === detail.player.length} />)
  }

  render () {
    const {dataSource} = this.state
    const horizontal = true
    return (
      /**
       * @TODO: I don't know what is the best practice to scroll both horizontal and vertical
       * The method I used here may not adaptable
       */
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={horizontal}
          style={styles.scrollView}>
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)}
            style={styles.listView} />
        </ScrollView>
      </View>
    )
  }
}

GamePlayers.propTypes = {
  detail: PropTypes.object
}

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 13,
    position: 'relative'
  },
  // Scroll
  scrollView: {
    flex: 1,
    width: 400
  },
  // List
  listView: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 48,
    marginRight: 30,
    width: 800
  },
  // Player box (tr)
  titleRow: {
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 2,
    height: 30,
    borderStyle: 'solid'
  },
  playerBox: {
    alignItems: 'stretch',
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 30
  },
  playerBoxLast: {
    borderBottomWidth: 0
  },
  // Every box (td)
  title: {
    alignSelf: 'center',
    color: '#7F7F7F',
    fontSize: 12
  },
  pName: {
    color: '#222',
    fontSize: 12,
    paddingLeft: 5
  },
  dataBox: {
    alignSelf: 'center',
    color: '#222',
    fontSize: 11
  },
  p1: {
    alignItems: 'center',
    borderRightColor: '#c2c2c2',
    borderRightWidth: 1,
    flex: 1,
    flexDirection: 'row'
  },
  lastP1: {
    borderRightWidth: 0
  },
  p2: {
    borderRightColor: '#c2c2c2',
    borderRightWidth: 1,
    flex: 2,
    flexDirection: 'row'
  },
  p2Name: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})
