import { SET_USER_ID, SET_USER_VALIDATION_ERROR, SET_USER_REGISTRATION_ERROR } from '../actions/authenticationActions';


const initialState = {
  user_id: null,
  loginError: false,
  registrationError: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, user_id: action.id };
    case SET_USER_VALIDATION_ERROR:
      return { ...state, loginError: action.error };
    case SET_USER_REGISTRATION_ERROR:
      return { ...state, registrationError: action.error }
    default:
      return state;
  }
}