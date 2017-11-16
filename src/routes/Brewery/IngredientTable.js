import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

const hIcon = "https://reicherthome.duckdns.org/icons/hops.png"
const fIcon = "https://reicherthome.duckdns.org/icons/fermentables.png"
const mIcon = "https://reicherthome.duckdns.org/icons/misc.png"
const wIcon = "https://reicherthome.duckdns.org/icons/water.png"
const yIcon = "https://reicherthome.duckdns.org/icons/yeast.png"

class BasicTable extends Component {
  render() {
    const { classes, recipe } = this.props
    return (
      <div className={classes.paper}>
        <Table style={recipe.ingredientTable.length > 0 ? {} : {display:'none'}}>
          <TableHead>
            <TableRow>
              <TableCell padding='none' style={{width:'1px'}}></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipe.ingredientTable.map(n => {
              return (
                <TableRow key={n.id}>
                  {/* Icon */}
                  <TableCell padding='none' style={n.archtype === 'Hop' ? {width:'1px'} : {display:'none'}}>{<Avatar src={hIcon} />}</TableCell>
                  <TableCell padding='none' style={n.archtype === 'Fermentable' ? {width:'1px'} : {display:'none'}}>{<Avatar src={fIcon} />}</TableCell>
                  <TableCell padding='none' style={n.archtype === 'Misc' ? {width:'1px'} : {display:'none'}}>{<Avatar src={mIcon} />}</TableCell>
                  <TableCell padding='none' style={n.archtype === 'Water' ? {width:'1px'} : {display:'none'}}>{<Avatar src={wIcon} />}</TableCell>
                  <TableCell padding='none' style={n.archtype === 'Yeast' ? {width:'1px'} : {display:'none'}}>{<Avatar src={yIcon} />}</TableCell>

                  <TableCell>{n.name}</TableCell>
                  <TableCell>{n.amount}</TableCell>
                  <TableCell>{n.type}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  recipe: state.recipe
})

export default withStyles(styles)(connect(mapStateToProps, {
})(BasicTable))
