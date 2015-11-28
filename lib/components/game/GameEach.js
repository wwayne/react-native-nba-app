'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  SegmentedControlIOS,
  ListView
} from 'react-native'

import PlayerInGame from './PlayerInGame'

export default class GameEach extends Component {

  static displayName = 'GameEach'

  constructor (props) {
    super(props)
    this.state = {
      value: 'HOME',
      selectedIndex: 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount () {
    const {game} = this.props.route
    const {actions} = this.props

    actions.getGameDetail(game.id, game.type)
  }

  onChange (event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  }

  onValueChange(value) {
    this.setState({
      value: value
    });
  }

  renderRow (player) {
    return (<PlayerInGame player={player} />)
  }

  render () {
    const {game} = this.props.route
    const {value, selectedIndex, dataSource} = this.state

    let rows = []
    if (game.detail.loaded) {
      console.log(game.detail)
      rows = game.detail.data[value.toLowerCase()].start.concat(game.detail.data[value.toLowerCase()].bench)
    }

    return (
      <View style={styles.container}>
        <SegmentedControlIOS 
          values={['HOME', 'AWAY']}
          selectedIndex={selectedIndex}
          onChange={this.onChange.bind(this)}
          onValueChange={this.onValueChange.bind(this)} />
        <Text>{game[value.toLowerCase()].team}</Text>
        <ListView 
          dataSource={dataSource.cloneWithRows(rows)} 
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 64
  },
  listView: {

  }
})
