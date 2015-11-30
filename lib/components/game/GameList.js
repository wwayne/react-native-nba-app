'use strict'

import React, {
  Component,
  StyleSheet,
  ListView,
  View,
  Text
} from 'react-native'

import GamePanel from './GamePanel'

export default class GameList extends Component {

  static displayName = 'GameList'

  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      intervalRequest: null,
      loaded: false
    }
  }

  componentDidMount() {
    const {actions} = this.props
    actions.getGameGeneral()
  }

  componentWillReceiveProps (props) {
    const {live, over, unstart, actions, navigator} = props
    const {dataSource, intervalRequest} = this.state

    const rows = live.data.concat(unstart.data).concat(over.data)

    let newIntervalRequest = null
    if (live.data.length > 0) {
      clearInterval(intervalRequest)
      newIntervalRequest = setInterval(() => {
        actions.getGameGeneral()
      }, 5000)
    } else if (unstart.data.length > 0) {
      clearInterval(intervalRequest)
      newIntervalRequest = setInterval(() => {
        actions.getGameGeneral()
      }, 120000)
    } else {
      clearInterval(intervalRequest)
    }

    this.setState({
      dataSource: dataSource.cloneWithRows(rows),
      intervalRequest: newIntervalRequest
    })
  }

  componentWillUnmount () {
    const {intervalRequest} = this.state
    clearInterval(intervalRequest)
  }

  renderRow (game, _, index) {
    return (<GamePanel game={game} index={index} {...this.props}/>) 
  }

  render () {
    const {dataSource} = this.state
    const {live, over, unstart} = this.props

    const gameDate = live.gameDate
    const liveCount = live.data.length
    const overCount = over.data.length
    const unstartCount = unstart.data.length

    return (
      <View style={styles.container}>
        <View style={styles.gameListWrapper}>
          <Text style={styles.gameListInfoDeco}>This is why we play</Text>
          <View style={styles.gameListInfo}>
            <Text style={styles.infoDate}>{gameDate}</Text>
            <Text style={styles.infoCount}>{liveCount + overCount + unstartCount + ' Games'}</Text>
          </View>
          <View style={styles.gameCurrentInfo}>
            <View style={styles.currentBlock}>
              <View style={styles.currentPanel}>
                <Text style={[styles.currentMatch, styles.currentLive]}>{liveCount}</Text>
                <Text style={[styles.currentType, styles.currentLive]}>LIVE</Text>
              </View>
            </View>
            <View style={styles.currentBlock}>
              <View style={styles.currentPanel}>
                <Text style={[styles.currentMatch, styles.currentUnStart]}>{unstartCount}</Text>
                <Text style={[styles.currentType, styles.currentUnStart]}>UNSTART</Text>
              </View>
            </View>
            <View style={styles.currentBlock}>
              <View style={styles.currentPanel}>
                <Text style={[styles.currentMatch, styles.currentOver]}>{overCount}</Text>
                <Text style={[styles.currentType, styles.currentOver]}>FINISH</Text>
              </View>
            </View>
          </View>
        </View>
        <ListView 
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // Info View
  gameListWrapper: {
    backgroundColor: '#465484',
    height: 85,
    flex: 1
  },
  gameListInfoDeco: {
    backgroundColor: '#303D6D',
    color: '#5A6BA7',
    fontSize: 12,
    height: 18,
    lineHeight: 16,
    textAlign: 'center',
  },
  // General Info
  gameListInfo : {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 10,
    paddingLeft: 12
  },
  infoDate: {
    color: '#fff',
    fontSize: 16,
  },
  infoCount: {
    color: '#fff',
    fontSize: 9,
    paddingLeft: 8,
    position: 'relative',
    top: 6
  },
  // Current Info
  gameCurrentInfo: {  
    flex: 2,
    flexDirection: 'row',
    paddingTop: 10,
  },
  currentBlock: {
    alignItems: 'center',
    flex: 1,
    height: 21
  },
  currentPanel: {
    alignItems: 'center',
    backgroundColor: '#293356',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 100
  },
  currentMatch: {
    fontWeight: 'bold',
    fontSize: 15
  },
  currentType: {
    fontSize: 9,
    paddingLeft: 3,
    position: 'relative',
    top: 2
  },
  currentLive: {
    color: '#F9977C'
  },
  currentUnStart: {
    color: '#F5E45E'
  },
  currentOver: {
    color: '#7AB8F8'
  },
  // List View
  listView: {
    backgroundColor: '#303D6D',
    flex: 6,
    flexDirection: 'column',
    paddingTop: 15
  }
})
