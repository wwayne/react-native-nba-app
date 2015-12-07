'use strict'

import React, {
  Component,
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native'
import {Icon} from 'react-native-icons'

export default class PlayerSearch extends Component {

  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  onBackPress () {
    const {navigator} = this.props
    navigator.pop()
  }

  render () {
    const {text} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.navigation}>
           <TouchableHighlight onPress={this.onBackPress.bind(this)} underlayColor='transparent' style={styles.backNav}>
            <Icon name='ion|ios-arrow-left' size={28} color='#fff' style={styles.backNav} />
          </TouchableHighlight>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            keyboardType={'default'}
            value={text}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#465484'
  },
  // Navigation
  navigation: {
    flexDirection: 'row',
    height: 45
  }, 
  backNav: {
    height: 30,
    width: 30
  },
  textInput: {
    height: 40, 
    backgroundColor: '#fff',
    borderColor: 'gray', 
    borderWidth: 1,
    width: 200
  }
})
