import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import './styles/main.scss'

import { XmlEntities } from 'html-entities'
const entities = new XmlEntities();

/** ACTIONS **/
import { receiveRecipe, receiveSettings } from './store/actions'
import { openMessage } from './components/Message'

import { BREW_SESSION } from './store/reducers/Brewery/BreweryReducer'

// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__)

// Socket.io
const webSocket = require('socket.io-client')('https://reicherthome.duckdns.org')
webSocket.on('connect', () => {
  console.log('Connected to server websocket!')
})
webSocket.on('recipe', (recipe) => {
  console.log('Received Recipe From Dashboard Server: ' + recipe)
  if (recipe !== null) {
    store.dispatch(receiveRecipe(recipe))
    store.dispatch(openMessage("Successfully uploaded '" + recipe.NAME + "' to brewery controller."))
  }
})
webSocket.on('settings', (settings) => {
  console.log('Received Settings From Dashboard Server: ' + settings)
  if (settings !== null) {
    store.dispatch(receiveSettings(settings))
  }
})
webSocket.on('brewSession', (brewSession) => {
  store.dispatch({
    type: BREW_SESSION,
    payload: brewSession
  })
})

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App').default

  ReactDOM.render(
    <App store={store} />,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './routes/index',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
