import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { history } from '../store/createStore'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import { withTheme } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';

import AppToolbar from './AppToolbar'

// Brewery
import BreweryTabContainer from '../routes/Brewery/BreweryTabContainer'

const styles = theme => ({
  root: {
    marginTop: 30,
    width: '100%',
  },
  list: {
    width: 250,
    flex: 'initial',
  },
})

class Navigation extends Component {
  state = {
    breweryValue: 0,
    openDrawer: false,
  }

  handleBreweryTabChange = (event, value) => this.setState({ breweryValue: value })
  handleLeftDrawerOpen = () => this.setState({ openDrawer: true })
  handleLeftDrawerClose = () => this.setState({ openDrawer: false })

  render() {
    const { path, history, classes, theme } = this.props
    const { breweryValue, openDrawer } = this.state

    const menuListItems = (
      <div>
        <ListItem button onClick={() => history.push('/brewery')}>
          <ListItemIcon>
            <SvgIcon>
              <svg width="100%" height="100%" viewBox="0 0 25 25" >
                <image href="https://image.flaticon.com/icons/svg/60/60547.svg" x="0" y="0" height="25" width="25"/>
              </svg>
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Brewery" />
        </ListItem>
        <ListItem button onClick={() => history.push('/chiller')}>
          <ListItemIcon>
            <SvgIcon>
              <svg width="100%" height="100%" viewBox="0 0 25 25" >
                <image href="https://image.flaticon.com/icons/svg/63/63341.svg" x="0" y="0" height="25" width="25"/>
              </svg>
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Chiller" />
        </ListItem>
      </div>
    )

    const sideList = (
      <div>
        <List className={classes.list} disablePadding>
          {menuListItems}
        </List>
        <Divider />
      </div>
    );

    return (
      <div>
        <AppBar position='fixed' >
          <AppToolbar
            handleLeftDrawerOpen={this.handleLeftDrawerOpen}
            handleBreweryTabChange={this.handleBreweryTabChange}
            breweryValue={breweryValue}
          />
        </AppBar>

        <Drawer
          open={openDrawer}
          onRequestClose={this.handleLeftDrawerClose}
          onClick={this.handleLeftDrawerClose}
        >
          {sideList}
        </Drawer>

        <BreweryTabContainer value={breweryValue} />
      </div>
    );
  }
}

Navigation.propTypes = {
}

const mapDispatchToProps = ({
})

const mapStateToProps = (state) => ({
  path: state.router.location.pathname
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(Navigation))))
