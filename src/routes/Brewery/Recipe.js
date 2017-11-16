import math from 'mathjs'
import numeral from 'numeral'
import df from 'duration-format'

class Recipe {
  constructor() {}

  /** Batch Size **/
  batchSizeGallons(recipe) {
    const size = math.unit(recipe.BATCH_SIZE, 'l').to('gal').format({notation:'fixed',precision:2})
    return size.toString()
  }
  batchSizeLiters(recipe) {
    const size = math.unit(recipe.BATCH_SIZE, 'l').format({notation:'fixed',precision:2})
    return size.toString()
  }

  /** Boil Size **/
  boilSizeGallons(recipe) {
    const size = math.unit(recipe.BOIL_SIZE, 'l').to('gal').format({notation:'fixed',precision:2})
    return size.toString()
  }
  boilSizeLiters(recipe) {
    const size = math.unit(recipe.BOIL_SIZE, 'l').format({notation:'fixed',precision:2})
    return size.toString()
  }

  /** Weight **/
  weight(original, originalUnits, newUnits, precision) {
    var weight = math.unit(original, originalUnits).to('newUnits')
    weight = precsion ? weight.format({notation:'fixed',precision:precision}) : weight
    return weight.toString()
  }

  /** Time Format **/
  formatMinutes(minutes) {
    return df(minutes * 60 * 1000, '#{H}hr #{M}min')
  }
}

export default Recipe
