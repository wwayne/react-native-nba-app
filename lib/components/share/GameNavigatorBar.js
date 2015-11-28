'use strict'

import React, {
  StyleSheet,
  View,
  Text
} from 'react-native'

import NavigatorBar from './NavigatorBar'

export default class GameNavigatorBar extends NavigatorBar {
  render () {
    const {presentedIndex} = this.state
    const {live, over, unstart, navState} = this.props
    
    const liveCount = live.data.length
    const overCount = over.data.length
    const unstartCount = unstart.data.length
    const gameDate = live.gameDate

    return (
      <View style={!presentedIndex ? styles.gameListWrapper : styles.gameDetailWrapper}>
      {/* Nvigator for Game list page */}
      { presentedIndex === 0 &&
        <View style={{flex: 1}}>
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
      }
      {/* Navigator for Game detail page */}
      { presentedIndex === 1 &&
        <Text style={styles.leftButton} onPress={this.onPressBack.bind(this)}>Back</Text>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gameListWrapper: {
    backgroundColor: '#465484',
    height: 85,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
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
  }
})
