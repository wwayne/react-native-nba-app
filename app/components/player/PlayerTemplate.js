'use strict'

import React, {
  Component,
  View,
  Text
} from 'react-native'

export default class PlayerTemplate extends Component {

  constructor (props) {
    super(props)
    this.state = {
      player: null
    }
  }

  componentDidMount () {
    const {player, order, actions} = this.props
    this.setState({
      player
    })
    /* load player's log if this is the first one */
    if (order === 0) actions.getPlayerLog(player.id)
  }

  componentWillReceiveProps (props) {
    const {order, currentOrder, player} = props
    if (order === currentOrder) {
      this.setState({
        player
      })
    }
  }

  /**
   * all template will rceive props
   * but we just want to re-render the chosen one which `isLogLoaded` is false
   */
  shouldComponentUpdate (props, state) {
    const {order, currentOrder, player} = props
    return (order === currentOrder) && !player.isLogLoaded
  }

  render () {
    const {player} = this.props
    console.log(player)
    return (
      <View>
        <Text>{player.firstName + ' ' + player.lastName}</Text>
      </View>
    )
  }
}