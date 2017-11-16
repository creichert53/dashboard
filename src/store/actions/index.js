import axios from 'axios'
import { IMPORT_RECIPE, IMPORT_SETTINGS } from '../reducers/Brewery/BreweryReducer'
import math from 'mathjs'
import uniqid from 'uniqid'

export const importRecipe = (recipe) => {
  recipe.HOPS.forEach((item,i,array) => {array[i].ADDED = false; array[i].NOTIFIED = false; array[i].ID = uniqid(); })
  recipe.FERMENTABLES.forEach((item,i,array) => { array[i].ADDED = false; array[i].NOTIFIED = false;; array[i].ID = uniqid(); })
  recipe.MISCS.forEach((item,i,array) => { array[i].ADDED = false; array[i].NOTIFIED = false;; array[i].ID = uniqid(); })
  recipe.WATERS.forEach((item,i,array) => { array[i].ADDED = false; array[i].NOTIFIED = false;; array[i].ID = uniqid(); })
  recipe.YEASTS.forEach((item,i,array) => { array[i].ADDED = false; array[i].NOTIFIED = false;; array[i].ID = uniqid(); })
  recipe.MASH.MASH_STEPS.forEach((item,i,array) => { array[i].COMPLETED = false; array[i].NOTIFIED = false;; array[i].ID = uniqid(); })

  return dispatch => {
    axios.post('https://reicherthome.duckdns.org/api/recipe', recipe).catch(err => {
      console.log(err);
    })
  }
}

let id = 0;
function createData(archtype, name, amount, type) {
  id += 1;
  return { id, archtype, name, amount: amount.toString(), type };
}

export const receiveRecipe = (recipe) => {
  id = 0
  var data = []
  if (recipe.HOPS !== undefined) {
    recipe.HOPS.forEach(element => {
      data.push(createData(
        'Hop',
        element.NAME,
        math.unit(element.AMOUNT, 'kg').to('oz').format({notation:'fixed',precision:2}),
        'Hop'
      ))
    })
  }
  if (recipe.FERMENTABLES !== undefined) {
    recipe.FERMENTABLES.forEach(element => {
      data.push(createData(
        'Fermentable',
        element.NAME,
        math.unit(element.AMOUNT, 'kg').to('lb').format({notation:'fixed',precision:2}),
        element.TYPE
      ))
    })
  }
  if (recipe.MISCS !== undefined) {
    recipe.MISCS.forEach(element => {
      data.push(createData(
        'Misc',
        element.NAME,
        element.DISPLAY_AMOUNT ? element.DISPLAY_AMOUNT : element.AMOUNT_IS_WEIGHT ?
          math.unit(element.AMOUNT, 'kg').to('oz').format({notation:'fixed',precision:2}) :
          math.unit(element.AMOUNT, 'l').to('cp').format({notation:'fixed',precision:1}),
        element.TYPE
      ))
    })
  }
  if (recipe.YEASTS !== undefined) {
    recipe.YEASTS.forEach(element => {
      data.push(createData(
        'Yeast',
        element.NAME,
        element.AMOUNT_IS_WEIGHT ?
          math.unit(element.AMOUNT, 'kg').to('oz').format({notation:'fixed',precision:2}) :
          math.unit(element.AMOUNT, 'l').to('cp').format({notation:'fixed',precision:1}),
        element.TYPE
      ))
    })
  }
  if (recipe.WATERS !== undefined) {
    recipe.WATERS.forEach(element => {
      data.push(createData(
        'Water',
        element.NAME,
        math.unit(element.AMOUNT, 'l').to('gal').format({notation:'fixed',precision:2}),
        ''
      ))
    })
  }

  recipe.ingredientTable = data

  return {
    type: IMPORT_RECIPE,
    payload: recipe
  }
}

export const receiveSettings = (settings) => {
  return {
    type: IMPORT_SETTINGS,
    payload: settings
  }
}
