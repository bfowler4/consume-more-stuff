import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import pageDisplayReducer from './pageDisplayReducer';
import authenticationReducer from './authenticationReduer';

export default combineReducers({
  pageDisplay: pageDisplayReducer,
  items: itemsReducer,
  authentication: authenticationReducer
});