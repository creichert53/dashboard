import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

const messageInitialState = {
  open: false,
  message: null,
}

const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE'
const HIDE_MESSAGE = 'HIDE_MESSAGE'
export const openMessage = (message) => {
  return {
    type: DISPLAY_MESSAGE,
    payload: message
  }
}
export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  }
}
export const messageReducer = (state = messageInitialState, action) => {
  switch (action.type) {
    case DISPLAY_MESSAGE:
      return {
        ...state.snackbar,
        message: action.payload,
        open: true
      }
    case HIDE_MESSAGE:
      return {
        ...state.snackbar,
        message: null,
        open: false
      }
    default:
      return state
  }
}

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
})

class SnackMessage extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.snackbar.open}
          autoHideDuration={6e3}
          onRequestClose={this.props.hideMessage}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.snackbar.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.props.hideMessage}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

SnackMessage.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = ({
  openMessage,
  hideMessage
})

const mapStateToProps = (state) => ({
  snackbar: state.snackbar
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SnackMessage))
