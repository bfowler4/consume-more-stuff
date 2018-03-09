import { SET_PAGE_TO_DISPLAY } from '../actions/pageDisplayActions';

const initialState = {
  currentPage: `homePage`
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PAGE_TO_DISPLAY:
      return { ...state, currentPage: action.page };
    default:
      return state;
  }
}