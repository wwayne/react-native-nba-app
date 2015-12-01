'use strict'

import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'
import React, {
  Component,
  View
} from 'react-native'

import actions from '../actions'

class Player extends Component {

  render () {
    return (
      <View />
    )
  }
}

export default connect(state => {
  return {
    playList: state.playList,
    search: state.search
  }
}, dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
})(Player)
