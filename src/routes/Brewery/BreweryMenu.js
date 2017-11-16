import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu';
import red from 'material-ui/colors/red'
import SRM from './SRM'
import NewRecipeButton from './NewRecipeButton'
import fastXmlParser from 'fast-xml-parser'

import { importRecipe } from '../../store/actions'
import { openMessage } from '../../components/Message'

const styles = theme => ({
  avatar: {
    backgroundColor: red[500],
  },
  input: {
    display: 'none',
  },
})

class BreweryMenu extends Component {
  handleFile = (event) => {
    var f = event.target.files[0]
    var reader = new FileReader()
    var options = {
      textNodeConversion : true,
      textAttrConversion : false,
      arrayMode : false
    }
    reader.onload = (e) => {
      if (fastXmlParser.validate(reader.result) === true) {
        var json = fastXmlParser.parse(reader.result,options)
        var recipe = json.RECIPES
        recipe = Array.isArray(recipe) ? recipe[0] : recipe.RECIPE
        recipe.HOPS = recipe.HOPS !== undefined ? (Array.isArray(recipe.HOPS.HOP) ? recipe.HOPS.HOP : [recipe.HOPS.HOP]) : []
        recipe.FERMENTABLES = recipe.FERMENTABLES !== undefined ? (Array.isArray(recipe.FERMENTABLES.FERMENTABLE) ? recipe.FERMENTABLES.FERMENTABLE : [recipe.FERMENTABLES.FERMENTABLE]) : []
        recipe.MISCS = recipe.MISCS !== undefined ? (Array.isArray(recipe.MISCS.MISC) ? recipe.MISCS.MISC : [recipe.MISCS.MISC]) : []
        recipe.WATERS = recipe.WATERS !== undefined ? (Array.isArray(recipe.WATERS.WATER) ? recipe.WATERS.WATER : [recipe.WATERS.WATER]) : []
        recipe.YEASTS = recipe.YEASTS !== undefined ? (Array.isArray(recipe.YEASTS.YEAST) ? recipe.YEASTS.YEAST : [recipe.YEASTS.YEAST]) : []
        recipe.MASH.MASH_STEPS = recipe.MASH !== undefined ? (Array.isArray(recipe.MASH.MASH_STEPS.MASH_STEP) ? recipe.MASH.MASH_STEPS.MASH_STEP : [recipe.MASH.MASH_STEPS.MASH_STEP]) : []
        this.props.importRecipe(recipe)
        this.props.handleRequestClose()
      }
    }
    reader.readAsText(f)
  }

  render() {
    const {
      anchorEl,
      handleRequestClose,
      open,
      classes,
    } = this.props
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onRequestClose={handleRequestClose}
      >
        <input
          accept='.xml'
          className={classes.input}
          id='file'
          multiple
          type='file'
          onChange={this.handleFile}
        />
        <label htmlFor='file' style={{width:'100%'}}>
          <MenuItem component='span'>
            Import Recipe
          </MenuItem>
        </label>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({

})

export default withStyles(styles)(connect(mapStateToProps, {
  importRecipe, openMessage
})(BreweryMenu))
