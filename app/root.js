'use strict'

import React, {
  Component,
  StatusBarIOS,
  Platform
} from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux/native'
import reducers from './reducers'

import logger from './middleware/logger'
import thunk from 'redux-thunk'

import App from './containers/App'

const createStoreWithMW = applyMiddleware(logger, thunk)(createStore)
const store = createStoreWithMW(reducers)

export default class Root extends Component {

  componentDidMount () {
    if (Platform.OS === 'ios') {
      StatusBarIOS.setHidden(true)
    }
  }

  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
}
