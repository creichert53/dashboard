import React from 'react'
import PropTypes from 'prop-types'
import Tabs, { Tab } from 'material-ui/Tabs'

export default function BreweryTabs(props) {
  return (
    <Tabs
      value={props.value}
      onChange={props.handleChange}
      centered
      fullWidth
    >
      <Tab label="Recipe" />
      <Tab label="Brew" />
      <Tab label="Settings" />
    </Tabs>
  )
}
