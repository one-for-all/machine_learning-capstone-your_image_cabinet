import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import UserReducer from './src/reducers/user'
import Application from './src/containers/App'

import './scss/application.scss'

const store = createStore(
  UserReducer,
  window.devToolsExtension && window.devToolsExtension()
)

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('container')
)
