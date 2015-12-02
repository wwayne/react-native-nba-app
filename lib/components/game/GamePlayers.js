'use strict'

import React, {
  Component,
  StyleSheet,
  PropTypes,
  View,
  ListView
} from 'react-native'

class PlayerRow extends Component {
  render () {
    const {player} = this.props

    return (
      <View></View>
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

  componentWillReceiveProps (props) {
    const {data, index} = props
    
    if (data.loaded) {
      const rows = index === 0 ? data.home.player : data.visitor.player
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(rows)
      })
    }
  }

  renderRow (player, _, index) {

    return (<PlayerRow player={player} index={index} />)
  }

  render () {
    const {data} = this.props
    const {dataSource} = this.state 

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.list}
      />
    )
  }
}

GamePlayers.propTypes = {
  data: PropTypes.object
}

const styles = StyleSheet.create({

})
