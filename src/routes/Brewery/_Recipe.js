import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import red from 'material-ui/colors/red'
import NewRecipeButton from './NewRecipeButton'
import fastXmlParser from 'fast-xml-parser'

import { XmlEntities } from 'html-entities'
const entities = new XmlEntities()

import SRM from './SRM'
import IngredientTable from './IngredientTable'
import RecipeTable from './RecipeTable'
import Recipe from './Recipe'
const srm = new SRM()
const beer = new Recipe()

const styles = theme => ({
})

class _Recipe extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
  }

  render() {
    const { value, classes, recipe } = this.props
    return (
      <div style={{marginBottom:'30px'}}>
        <div className='row' style={
          recipe.ingredientTable.length > 0 ? {} : {display:'none'}
        } >
          <div className='col-12'>
            <Card style={{maxWidth:'600px',margin:'auto',marginTop:'20px'}}>
              <CardContent>
                <Typography type='display1' component='h2' align='left'>
                  Recipe
                </Typography>
                <Divider light style={{marginTop:'10px'}}/>
                <RecipeTable />
              </CardContent>
            </Card>
            <Card style={{maxWidth:'600px',margin:'auto',marginTop:'20px'}}>
              <CardContent>
                <Typography type='display1' component='h2' align='left'>
                  Ingredients
                </Typography>
                <Divider light style={{marginTop:'10px'}}/>
                <IngredientTable />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  recipe: state.recipe
})

export default withStyles(styles)(connect(mapStateToProps, {
})(_Recipe))
