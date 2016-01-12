'use strict'

import React, {
  Component,
  PropTypes,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions
} from 'react-native'

const tooltipWidth = 100
const barWidth = 15

export default class PlayerTrendBarItem extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isHover: false,
      isHoverCovered: false,
      isHoverCoveredRight: false
    }
  }

  onPressIn (e) {
    const screenWidth = Dimensions.get('window').width

    this.setState({
      isHover: true,
      isHoverCoveredLeft: e.nativeEvent.pageX < (tooltipWidth / 2 + 10),
      isHoverCoveredRight: e.nativeEvent.pageX + tooltipWidth / 2 + 20 > screenWidth
    })
  }

  onPressOut (e) {
    this.setState({
      isHover: false,
      isHoverCovered: false,
      isHoverCoveredRight: false
    })
  }

  render () {
    const {color, low, high, value, date, unitHeight, barInterval, barItemTop} = this.props
    const {isHover, isHoverCoveredLeft, isHoverCoveredRight} = this.state

    let entity
    let empty
    let wrapperStyle = {}
    if (value >= 0) {
      entity = value
      empty = high - value
    } else {
      entity = Math.abs(value)
      empty = Math.abs(low) - entity
      wrapperStyle = {
        top: high * unitHeight,
        right: barInterval,
        transform: [{
          rotate: '180deg'
        }]
      }
    }

    /* Prevent tooltip covered by the edge */
    let tooltipPosition = {
      left: -(tooltipWidth / 2),
      marginLeft: barWidth / 2
    }
    let tooltipMark = {
      left: tooltipWidth / 2,
      marginLeft: -6,
      borderLeftWidth: 6,
      borderRightWidth: 6
    }
    if (isHoverCoveredLeft) {
      tooltipPosition.left = 0
      tooltipPosition.marginLeft = 0
      tooltipMark.left = 5
      tooltipMark.marginLeft = 0

      delete tooltipMark.borderLeftWidth
    } else if (isHoverCoveredRight) {
      delete tooltipPosition.left
      delete tooltipPosition.marginLeft
      delete tooltipMark.left
      delete tooltipMark.marginLeft

      tooltipPosition.right = 3
      delete tooltipMark.borderRightWidth
      tooltipMark.right = 5
    }

    const baseStyle = {
      backgroundColor: color,
      marginRight: barInterval
    }
    return (
      <TouchableHighlight
        onPressIn={this.onPressIn.bind(this)}
        onPressOut={this.onPressOut.bind(this)}
        underlayColor='transparent'>
        <View style={[styles.container, {marginTop: barItemTop}]}>
          <View style={[styles. barWrapper, wrapperStyle]}>
            <View style={[styles.bar, styles.empty, Object.assign({}, baseStyle, {height: (empty * unitHeight)})]} />
            <View style={[styles.bar, Object.assign({}, baseStyle, {height: (entity * unitHeight)})]} />
          </View>
          {isHover &&
            <View style={[styles.tooltip, tooltipPosition]}>
              <Text style={styles.tooltipContent}>{value + ' in ' + date}</Text>
              <View style={[styles.tooltipMark, tooltipMark]} />
            </View>
          }
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  // Bar
  barWrapper: {
    position: 'relative'
  },
  bar: {
    width: barWidth
  },
  empty: {
    opacity: 0.2
  },
  // Tooltip
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 5,
    paddingHorizontal: 3,
    paddingVertical: 2,
    position: 'absolute',
    top: -17,
    width: tooltipWidth
  },
  tooltipContent: {
    color: '#fff',
    fontSize: 9,
    textAlign: 'center'
  },
  tooltipMark: {
    borderTopColor: 'rgba(0, 0, 0, 0.8)',
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    bottom: -5,
    position: 'absolute',
    height: 0,
    width: 0
  }
})

PlayerTrendBarItem.propTypes = {
  value: PropTypes.number,
  high: PropTypes.number,
  low: PropTypes.number,
  color: PropTypes.string,
  unitHeight: PropTypes.number,
  date: PropTypes.string,
  barInterval: PropTypes.number,
  barItemTop: PropTypes.number
}
