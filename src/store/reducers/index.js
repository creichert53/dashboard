import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { responsiveStateReducer } from 'redux-responsive'

import {
  breweryRecipeReducer,
  brewerySettingsReducer,
  brewSessionReducer
} from './Brewery/BreweryReducer'
import { messageReducer } from '../../components/Message'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    recipe: breweryRecipeReducer,
    brewerySettings: brewerySettingsReducer,
    brewSession: brewSessionReducer,
    router: routerReducer,
    browser: responsiveStateReducer,
    snackbar: messageReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
