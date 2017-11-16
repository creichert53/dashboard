import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar';
import Recipe from './Recipe'
import SRM from './SRM'

const beer = new Recipe()
const srm = new SRM()

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
  componentWillMount = () => {
    this.createRecipeTable(this.props.recipe)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.recipe !== this.props.recipe) {
      this.createRecipeTable(nextProps.recipe)
    }
  }

  createRecipeTable = (recipe) => {
    var newRecipeTable = []
    if (recipe.NAME && recipe.NAME.length > 0) { newRecipeTable.push({ id:0,name:'Name',value:recipe.NAME }) }
    if (recipe.BREWER && recipe.BREWER.length > 0) { newRecipeTable.push({ id:1,name:'Brewer',value:recipe.BREWER }) }
    if (recipe.ASST_BREWER && recipe.ASST_BREWER.length > 0) { newRecipeTable.push({ id:2,name:'Assistant Brewer',value:recipe.ASST_BREWER }) }
    if (recipe.BATCH_SIZE ) { newRecipeTable.push({ id:3,name:'Batch Size',value:beer.batchSizeGallons(recipe) }) }
    if (recipe.BOIL_SIZE) { newRecipeTable.push({ id:4,name:'Boil Size',value:beer.boilSizeGallons(recipe) }) }
    if (recipe.BOIL_TIME) { newRecipeTable.push({ id:5,name:'Boil Time',value:beer.formatMinutes(recipe.BOIL_TIME) }) }
    if (recipe.EST_COLOR && recipe.EST_COLOR.length > 0) { newRecipeTable.push({ id:6,name:'Color',value:srm.colorOf(recipe.EST_COLOR) }) }
    this.recipeTable = [ ...newRecipeTable ]
  }

  recipeTable = []

  render() {
    const { classes, recipe } = this.props
    return (
      <div className={classes.paper}>
        <Table style={this.recipeTable.length > 0 ? {} : {display:'none'}}>
          <TableBody>
            {this.recipeTable.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell style={{fontWeight:'bold'}}>{n.name}</TableCell>
                  <TableCell style={n.name === 'Color' ? {color:n.value,backgroundColor:n.value} : {}}>{n.value}</TableCell>
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
