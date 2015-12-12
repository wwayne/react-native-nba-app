/**
 * @note I didn't customer navigator bar because could be flick when switching
 */
'use strict'

import React, {
  Component,
  View
} from 'react-native'

export default class NavigatorBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presentedIndex: 0,
      routeStack: []
    }
  }

  componentDidMount () {
    const {navState} = this.props
    this.setState({
      presentedIndex: navState.presentedIndex
    })
  }

  componentWillReceiveProps (props) {
    this.setState({
      presentedIndex: props.navState.routeStack.length - 1
    })
  }

  onPressBack () {
    const {navigator} = this.props
    navigator.pop()
  }

  render () {
    return (
      <View />
    )
  }
}
