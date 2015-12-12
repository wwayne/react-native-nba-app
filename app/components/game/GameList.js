'use strict'

import React, {
  Component,
  StyleSheet,
  ListView,
  View,
  Text,
  PropTypes,
  AsyncStorage
} from 'react-native'

import GamePanel from './GamePanel'
import {APP} from '../../constant'

export default class GameList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

 /**
  * TODO: check what will be triggered when user re active app(from backend to front-end)
  */
  componentDidMount () {
    const {actions} = this.props
    actions.getGameGeneral()
    this.resume
  }

  componentWillReceiveProps (props) {
    const {live, over, unstart, actions} = props
    const {dataSource, intervalRequest} = this.state

    this.checkTab()
      .then(isGame => {
        if (isGame) {
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
        } else {
          this.resume()
        }
      })
  }

  /* Control interval in this page */
  resume () {
    const {actions} = this.props

    setTimeout(() => {
      this.checkTab()
        .then(isGame => {
          if (isGame) {
            return actions.getGameGeneral()
          } else {
            this.resume()
          }
        })
    }, 10000)
  }

  checkTab () {
    return AsyncStorage.getItem(APP.CURRENTTAB)
      .then(currentTab => {
        if (currentTab === 'game') return true
        return false
    })
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
    textAlign: 'center'
  },
  // General Info
  gameListInfo: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 10,
    paddingLeft: 12
  },
  infoDate: {
    color: '#fff',
    fontSize: 16
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
    paddingTop: 10
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
    paddingTop: 12
  }
})
