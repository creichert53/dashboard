import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _Brew from './_Brew'
import _Recipe from './_Recipe'
import _Settings from './_Settings'

function TabContainer(props) {
  return (
    <div style={{marginTop:'50px'}}>
      {props.children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

class BreweryTabContainer extends Component {
  render() {
    const { value } = this.props
    return (
      <div className='container-fluid' style={{marginTop:'105px'}}>
        {
          value === 0 &&
          <TabContainer>
            {<_Recipe value={value}/>}
          </TabContainer>
        }
        {
          value === 1 &&
          <TabContainer>
            {<_Brew value={value}/>}
          </TabContainer>
        }
        {
          value === 2 &&
          <TabContainer>
            {<_Settings value={value}/>}
          </TabContainer>
        }
      </div>
    )
  }
}

export default BreweryTabContainer
