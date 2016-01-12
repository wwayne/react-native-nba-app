'use strict'

import React, {
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'

import PlayerTrendBarItem from './PlayerTrendBarItem'
const barInterval = 2
const barItemTop = 16

export default class PlayerTrend extends Component {

  constructor (props) {
    super(props)
    this.unitHeight = 2
  }
  /**
   * calculate lowest, highest, average, total of a froup of data
   * @params data{Array} indicatior{String}
   * @return {low, high, lowDate, highDate, avg, sum, count}
   */
  calculateLog (data, indicator) {
    const count = data.length
    let high = data[0][indicator]
    let low = data[0][indicator]
    let highDate = data[0]['gameDate']
    let lowDate = data[0]['gameDate']
    let sum = 0

    let value
    data.forEach((d, index) => {
      value = d[indicator]
      sum += value
      if (value < low) {
        low = value
        lowDate = data[index]['gameDate']
      } else if (value > high) {
        high = value
        highDate = data[index]['gameDate']
      }
    })

    return {
      low,
      high,
      count,
      sum,
      avg: sum / count,
      highDate,
      lowDate
    }
  }

  renderBars (data, high, low, color) {
    const {unitHeight} = this

    return data.map((value, index) => {
      return (
        <PlayerTrendBarItem
          key={index}
          value={value}
          high={high}
          low={low}
          color={color}
          unitHeight={unitHeight}
          date={this.props.data[index].gameDate}
          barItemTop={barItemTop}
          barInterval={barInterval} />
      )
    })
  }

  render () {
    const {data, color} = this.props
    const {unitHeight} = this
    const footData = this.calculateLog(data, 'plusMinus')

    const scrollHeight = footData.high * unitHeight + Math.abs(footData.low) * unitHeight + barItemTop
    return (
      <View style={styles.container}>
        <Text style={styles.title}>+ / -</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          directionalLockEnabled
          style={[styles.scrollView, {height: scrollHeight}]}>
          {this.renderBars(data.map(d => d.plusMinus), footData.high, footData.low, color)}
        </ScrollView>
        <View style={styles.summary}>
          <View style={styles.sumLeft}>
            <Text style={styles.sumAvg}>{(footData.avg).toFixed(2)}</Text>
            <Text style={styles.sumAvgLabel}>avg</Text>
          </View>
          <View style={styles.sumRight}>
            <View style={styles.sumPolarItem}>
              <Text style={styles.sumPolarLabel}>Highest:</Text>
              <Text style={styles.sumPolarNumber}>{footData.high}</Text>
              <Text style={styles.sumPolarLabel}>{'in ' + footData.highDate}</Text>
            </View>
            <View style={styles.sumPolarItem}>
              <Text style={styles.sumPolarLabel}>Lowest:</Text>
              <Text style={styles.sumPolarNumber}>{footData.low}</Text>
              <Text style={styles.sumPolarLabel}>{'in ' + footData.lowDate}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 30
  },
  title: {
    color: '#6B7C96',
    fontSize: 13,
    fontWeight: '600'
  },
  // Bar chart
  scrollView: {
    position: 'relative'
  },
  // Summary
  summary: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    marginTop: 20
  },
  sumLeft: {
    alignItems: 'flex-end',
    bottom: -4, // Why flex-end can't align them...
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
  },
  sumAvg: {
    color: '#909CAF',
    fontSize: 25,
    fontWeight: '200'
  },
  sumAvgLabel: {
    color: '909CAF',
    marginLeft: 2,
    position: 'relative',
    top: -3
  },
  sumRight: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  sumPolarItem: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 2
  },
  sumPolarLabel: {
    color: '#909CAF',
    fontSize: 11,
    marginLeft: 3
  },
  sumPolarNumber: {
    color: '#6B7C96',
    fontSize: 15,
    marginLeft: 3,
    position: 'relative',
    top: 1.5
  }
})

PlayerTrend.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string
}
