import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { history } from '../store/createStore'

import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import WarningIcon from 'material-ui-icons/Warning';
import { withTheme } from 'material-ui/styles';

import BreweryTabs from '../routes/Brewery/BreweryTabs'
import BreweryMenu from '../routes/Brewery/BreweryMenu'

const styles = theme => ({
  flex: {
    flex: 1,
  },
})

class AppToolbar extends Component {
  state = {
    openMenu: false,
    anchorEl: undefined,
  }

  handleOpenMenu = (event) => this.setState({ openMenu: true, anchorEl: event.currentTarget })
  handleCloseMenu = () => this.setState({ openMenu: false })

  render() {
    const {
      handleBreweryTabChange,
      handleLeftDrawerOpen,
      breweryValue,
      path,
      history,
      classes,
      theme,
      notification
    } = this.props
    const { openMenu, anchorEl } = this.state
    return (
      <div>
        {/* Navigation */}
        <Toolbar>
          <IconButton
            aria-label="Menu"
            color="contrast"
            onClick={handleLeftDrawerOpen}
            style={{color: 'white'}}
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Reichert Homebrewery
          </Typography>
          <IconButton
            aria-label="Notification"
            style={notification ? {color: 'red'} : {display:'none'}}
          >
            <WarningIcon />
          </IconButton>
          <IconButton
            aria-label="More"
            aria-owns={openMenu ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleOpenMenu}
            style={{color: 'white'}}
          >
            <MoreVertIcon />
            <BreweryMenu open={openMenu} anchorEl={anchorEl} handleRequestClose={this.handleCloseMenu} />
          </IconButton>
        </Toolbar>

        {/* Brewery Page */}
        <BreweryTabs handleChange={handleBreweryTabChange} value={breweryValue} />
      </div>
    );
  }
}

AppToolbar.propTypes = {
}

const mapDispatchToProps = ({
})

const mapStateToProps = (state) => ({
  path: state.router.location.pathname,
  notification: state.notification
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(AppToolbar))))
