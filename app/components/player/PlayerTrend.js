'use strict'

import React, {
  Component,
  PropTypes,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'

export default class PlayerTrend extends Component {

  /**
   * calculate lowest, highest, average, total of a froup of data
   * @params data{Array} indicatior{String}
   * @return {low, hight, avg, sum, count}
   */
  calculateLog (data, indicator) {
    const count = data.length
    let high = data[0][indicator]
    let low = data[0][indicator]
    let sum = 0

    let value
    data.forEach(d => {
      value = d[indicator]
      sum += value
      if (value < low) {
        low = value
      } else if (value > high) {
        high = value
      }
    })

    return {
      low,
      high,
      count,
      sum,
      avg: sum / count
    }
  }

  renderBars (data, high, low) {
    console.log(data, high, low)
  }

  render () {
    const {data} = this.props
    const footData = this.calculateLog(data, 'plusMinus')

    return (
      <View>
        <Text>+ / -</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} >
          {this.renderBars(data, footData.high, footData.low)}
        </ScrollView>
        <View>
          <View>
            <Text>{(footData.avg).toFixed(2)}</Text>
            <Text>avg</Text>
          </View>
          <View>
            <Text>{'Highest: ' + footData.high}</Text>
            <Text>{'Lowest: ' + footData.low}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

PlayerTrend.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string
}
