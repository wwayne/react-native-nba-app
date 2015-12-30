'use strict'

import React, {
  Component,
  PropTypes,
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native'

import {Icon} from 'react-native-icons'

export default class PlayerLog extends Component {

  constructor (props) {
    super(props)
    const data = this.props.data[0]
    const width = this.getWidth(data)
    this.state = {
      pts: new Animated.Value(width.pts),
      ast: new Animated.Value(width.ast),
      reb: new Animated.Value(width.reb),
      stl: new Animated.Value(width.stl),
      blk: new Animated.Value(width.blk),
      tov: new Animated.Value(width.tov),
      min: new Animated.Value(width.min),
      currentIndex: 0
    }
  }

  /**
   * Calculate width of each bar
   * @params {pts: {Number}, ast, reb, stl, blk, tov, min}
   * @return {pts: {Number}, ast, reb, stl, blk, tov, min}
   */
  getWidth (data) {
    const deviceWidth = Dimensions.get('window').width
    const maxWidth = 350
    const indicators = ['pts', 'ast', 'reb', 'stl', 'blk', 'tov', 'min']
    const unit = {
      ptsUnit: Math.floor(maxWidth / 45),
      astUnit: Math.floor(maxWidth / 15),
      rebUnit: Math.floor(maxWidth / 18),
      stlUnit: Math.floor(maxWidth / 6),
      blkUnit: Math.floor(maxWidth / 7),
      tovUnit: Math.floor(maxWidth / 10),
      minUnit: Math.floor(maxWidth / 60)
    }
    let width = {}
    let widthCap // Give with a max cap
    indicators.forEach(item => {
      /* React-Native bug: if width=0 at first time, the borderRadius can't be implemented in the View */
      widthCap = data[item] * unit[`${item}Unit`] || 5
      width[item] = widthCap <= (deviceWidth - 50) ? widthCap : (deviceWidth - 50)
    })

    return width
  }

  onPressLeft () {
    const {currentIndex} = this.state
    const {data} = this.props
    if (currentIndex < data.length - 1) this.handleAnimation(currentIndex + 1)
  }

  onPressRight () {
    const {currentIndex} = this.state
    if (currentIndex > 0) this.handleAnimation(currentIndex - 1)
  }

  handleAnimation (index) {
    const {data} = this.props
    const width = this.getWidth(data[index])
    const timing = Animated.timing

    const indicators = ['pts', 'ast', 'reb', 'stl', 'blk', 'tov', 'min']
    Animated.parallel(indicators.map(item => {
      return timing(this.state[item], {toValue: width[item]})
    })).start()
    /**
     * Animated won't trigger react life cycle
     * I'm not sure if using animated and setState in a same time would affect performance, not bad for now
     */
    this.setState({
      currentIndex: index
    })
  }

  render () {
    const {pts, ast, reb, stl, blk, tov, min} = this.state
    const {currentIndex} = this.state
    const data = this.props.data[currentIndex]

    const d = new Date(data.gameDate)
    const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

    /* set opacity=0 if no prev or no next, or the size will be changed unexpected */
    const canPrev = currentIndex < this.props.data.length - 1 ? 1 : 0
    const canNext = currentIndex > 0 ? 1 : 0
    return (
      <View style={styles.container}>

        <View style={styles.item}>
          <Text style={styles.label}>Points</Text>
          <View style={styles.data}>
            {pts &&
              <Animated.View style={[styles.bar, styles.points, {width: pts}]} />
            }
            <Text style={styles.dataNumber}>{data.pts}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Assists</Text>
          <View style={styles.data}>
            {ast &&
              <Animated.View style={[styles.bar, styles.assists, {width: ast}]} />
            }
            <Text style={styles.dataNumber}>{data.ast}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Rebounds</Text>
          <View style={styles.data}>
            {reb &&
              <Animated.View style={[styles.bar, styles.rebounds, {width: reb}]} />
            }
            <Text style={styles.dataNumber}>{data.reb}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Steals</Text>
          <View style={styles.data}>
            {stl &&
              <Animated.View style={[styles.bar, styles.steals, {width: stl}]} />
            }
            <Text style={styles.dataNumber}>{data.stl}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Blocks</Text>
          <View style={styles.data}>
            {blk &&
              <Animated.View style={[styles.bar, styles.blocks, {width: blk}]} />
            }
            <Text style={styles.dataNumber}>{data.blk}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Turnovers</Text>
          <View style={styles.data}>
            {tov &&
              <Animated.View style={[styles.bar, styles.turnovers, {width: tov}]} />
            }
            <Text style={styles.dataNumber}>{data.tov}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Minutes</Text>
          <View style={styles.data}>
            {min &&
              <Animated.View style={[styles.bar, styles.minutes, {width: min}]} />
            }
            <Text style={styles.dataNumber}>{data.min}</Text>
          </View>
        </View>

        <View style={styles.controller}>
          <TouchableHighlight onPress={this.onPressLeft.bind(this)} underlayColor='transparent' style={[styles.button, {opacity: canPrev}]}>
            <Icon name='ion|ios-arrow-left' size={28} color='#6B7C96' style={styles.chevronLeft} />
          </TouchableHighlight>
          <Text style={styles.date}>{date}</Text>
          <TouchableHighlight onPress={this.onPressRight.bind(this)} underlayColor='transparent' style={[styles.button, {opacity: canNext}]}>
            <Icon name='ion|ios-arrow-right' size={28} color='#6B7C96' style={styles.chevronRight} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6
  },
  // Item
  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  label: {
    color: '#CBCBCB',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    top: 2
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 11
  },
  // Bar
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 8,
    marginRight: 5
  },
  points: {
    backgroundColor: '#F55443'
  },
  assists: {
    backgroundColor: '#FCBD24'
  },
  rebounds: {
    backgroundColor: '#59838B'
  },
  steals: {
    backgroundColor: '#4D98E4'
  },
  blocks: {
    backgroundColor: '#418E50'
  },
  turnovers: {
    backgroundColor: '#7B7FEC'
  },
  minutes: {
    backgroundColor: '#3ABAA4'
  },
  // controller
  controller: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  button: {
    flex: 1,
    position: 'relative',
    top: -1
  },
  chevronLeft: {
    alignSelf: 'flex-end',
    height: 28,
    marginRight: 10,
    width: 28
  },
  chevronRight: {
    alignSelf: 'flex-start',
    height: 28,
    marginLeft: 10,
    width: 28
  },
  date: {
    color: '#6B7C96',
    flex: 1,
    fontSize: 22,
    fontWeight: '300',
    height: 28,
    textAlign: 'center'
  }

})

PlayerLog.propTypes = {
  data: PropTypes.array
}
