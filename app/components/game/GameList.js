'use strict'

import React, {
  Component,
  StyleSheet,
  ListView,
  View,
  Text,
  PropTypes,
  TouchableHighlight
} from 'react-native'

import { Icon} from 'react-native-icons'
import moment from 'moment-timezone'
import GamePanel from './GamePanel'
import Tabbar from '../share/Tabbar'

export default class GameList extends Component {
  constructor (props) {
    super(props)
    /* Get the date of today , format: [year, month, date] */
    const dateString = moment.tz(Date.now(), 'America/Los_Angeles').format()
    const dateArray = dateString.replace('T', '-').split('-')
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      date: [dateArray[0], dateArray[1], dateArray[2]]
    }
  }

 /**
  * TODO: check what will be triggered when user re active app(from backend to front-end)
  */
  componentDidMount () {
    const {actions} = this.props
    const {date} = this.state
    actions.getGameGeneral(date[0], date[1], date[2])
  }

  componentWillReceiveProps (props) {
    const {live, over, unstart, actions} = props
    const {dataSource} = this.state

    const rows = live.data.concat(unstart.data).concat(over.data)
    if (live.data.length > 0) {
      setTimeout(() => {
        actions.getGameGeneral()
      }, 5000)
    } else if (unstart.data.length > 0) {
      setTimeout(() => {
        actions.getGameGeneral()
      }, 120000)
    }
    this.setState({
      dataSource: dataSource.cloneWithRows(rows)
    })
  }

  componentWillUnmount () {
  }

  renderRow (game, _, index) {
    return (<GamePanel game={game} index={index} {...this.props}/>)
  }

  /* Swith between yesterday and today */
  changeDate () {

  }

  render () {
    const {dataSource, date} = this.state
    const {live, over, unstart} = this.props

    const gameDate = live.gameDate
    const gameCount = live.data.length + live.data.length + unstart.data.length

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.changeDate.bind(this)} underlayColor='transparent'>
            <Icon name='ion|pizza'
              size={18}
              color='#fff'
              style={styles.calendarIcon}
            />
          </TouchableHighlight>
          <Text style={styles.gameDate}>{date[0] + '-' + date[1] + '-' + date[2]}</Text>
          <Text style={styles.gameCount}>{gameCount + ' Games'}</Text>
        </View>
        <Tabbar tab={'game'} {...this.props}/>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
        />
      </View>
    )
  }
}

GameList.propTypes = {
  actions: PropTypes.object,
  live: PropTypes.object,
  unstart: PropTypes.object,
  over: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // Header
  header: {
    backgroundColor: '#4D98E4',
    height: 100,
    flexDirection: 'column',
    position: 'relative',
    paddingLeft: 15
  },
  calendarIcon: {
    alignSelf: 'flex-end',
    height: 15,
    marginRight: 15,
    marginTop: 12,
    width: 25
  },
  gameDate: {
    color: '#fff',
    fontWeight: '200',
    fontSize: 25,
  },
  gameCount: {
    color: '#fff',
    fontWeight: '200',
    fontSize: 14
  },
  // List View
  listView: {
    backgroundColor: '#fff',
    flex: 6,
    flexDirection: 'column',
    paddingTop: 12
  }
})
