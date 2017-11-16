import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Brewery extends React.Component {

  render() {
    return (
      <div>
        <h1>Title</h1>
      </div>
    )
  }

}

Brewery.propTypes = {

}

const mapStateToProps = (state) => ({
})

export default withRouter(connect(mapStateToProps)(Brewery))
