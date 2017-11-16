export const IMPORT_RECIPE = 'IMPORT_RECIPE'
export const IMPORT_SETTINGS = 'IMPORT_SETTINGS'

export const breweryRecipeReducer = (state = {ingredientTable:[]}, action) => {
  switch (action.type) {
    case IMPORT_RECIPE:
      return action.payload
    default:
      return state
  }
}

export const brewerySettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case IMPORT_SETTINGS:
      return action.payload
    default:
      return state
  }
}


export const BREW_SESSION = 'BREW_SESSION'
export const brewSessionReducer = (state = {}, action) => {
  switch (action.type) {
    case BREW_SESSION:
      return action.payload
    default:
      return state
  }
}
