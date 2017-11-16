import React from 'react'
import { connect, Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../store/createStore'
import Navigation from './Navigation'
import { Helmet } from "react-helmet"

import { MuiThemeProvider } from 'material-ui/styles';
const { muiTheme } = require('../styles/muiTheme')

import SnackMessage from './Message'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { location } = this.props
    return (
      <MuiThemeProvider theme={muiTheme}>
        <Provider store={this.props.store}>
          <ConnectedRouter history={history} location={location}>
            <div>
              <Helmet>
                <title>Reichert Homebrewery</title>
                <meta charset='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
                <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' />
                <link href='https://fonts.googleapis.com/css?family=Open+Sans|Roboto' rel='stylesheet' />
                <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
                  integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
                  crossorigin="anonymous"
                />
              </Helmet>
              <Navigation />
              <SnackMessage />
            </div>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  location: PropTypes.object,
  store: PropTypes.object,
}

const mapStateToProps = (state) => ({
  location: state.router.location,
})

export default connect(mapStateToProps, null)(App)
