'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions
} from 'react-native'

import Collection from '../../lib/collection'
import PlayerTemplate from './PlayerTemplate'
import teamInfo from '../../utils/team-map'

export default class PlayerIndex extends Component {

  constructor (props) {
    super(props)
    this.state = {
      myPlayers: {data: []},
      currentOrder: 0
    }
    this.screenWidth = Dimensions.get('window').width
  }

  componentDidMount () {
    const {actions} = this.props
    actions.getMyPlayers()
  }

  componentWillReceiveProps (props) {
    const {myPlayers} = props
    this.setState({
      myPlayers
    })
  }

  scrollEnd (x, y) {
    const {screenWidth} = this
    
    this.setState({
      currentOrder: Math.floor(x / screenWidth)
    })
  }

  renderPlayer () {
    const {myPlayers, currentOrder} = this.state

    return myPlayers.data.map((player, index) => {
      return (
        <PlayerTemplate key={index} player={player} order={index} currentOrder={currentOrder} {...this.props}/>
      )
    })
  }

  render () {
    const {myPlayers} = this.state

    return (
      <View style={styles.container}>
        {myPlayers.data &&
        <Collection style={styles.mainView} scrollEnd={this.scrollEnd.bind(this)}>
          {this.renderPlayer()}
        </Collection>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  // List
  mainView: {
    flex: 1,
    backgroundColor: '#fff'
  }
})