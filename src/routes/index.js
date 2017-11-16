import React from 'react'
import { Route, Switch } from 'react-router'

import Brewery from './Brewery'

class Routes extends React.Component {
  render () {
    return (
      <div className='container' style={{marginTop:15}}>
        <Switch>
          <Route exact path='/' render={() => <Brewery />} />
          <Route path='/brewery' render={() => <Brewery />} />
        </Switch>
      </div>
    )
  }
}

export default Routes
