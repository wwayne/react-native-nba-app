'use strict'

import React, {
  Component,
  StyleSheet,
  ListView
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
    actions.initialGame()
  }

  componentWillReceiveProps (props) {
    const {live, over, unstart, actions, navigator} = props
    const {dataSource, intervalRequest} = this.state

    const rows = live.data.concat(over.data).concat(unstart.data)

    let newIntervalRequest = null
    if (live.data.length > 0) {
      clearInterval(intervalRequest)
      newIntervalRequest = setInterval(() => {
        actions.initialGame()
      }, 5000)
    } else if (unstart.data.length > 0) {
      clearInterval(intervalRequest)
      newIntervalRequest = setInterval(() => {
        actions.initialGame()
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

    return (
      <ListView 
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.listView}
      />
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#303D6D',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  }
})
