import Axios from 'axios';

const HOST = `/api`;

export const SET_USER_ID = `SET_USER_ID`;
export const SET_USER_VALIDATION_ERROR = `SET_USER_VALIDATION_ERROR`;
export const SET_USER_REGISTRATION_ERROR = `SET_USER_REGISTRATION_ERROR`;

export const login = (username, password, callback) => {
  return dispatch => {
    return Axios.post(`${HOST}/login`, { username, password })
    .then(user => {
      localStorage.setItem(`user_id`, user.data.id);
      dispatch({
        type: SET_USER_VALIDATION_ERROR,
        error: false
      });
      return dispatch({
        type: SET_USER_ID,
        id: user.data.id
      });
    })
    .then(() => {
      callback();
    })
    .catch(err => {
      return dispatch({
        type: SET_USER_VALIDATION_ERROR,
        error: true
      });
    });
  };
};

export const register = (email, username, password, callback) => {
  return dispatch => {
    return Axios.post(`${HOST}/register`, { email, username, password })
    .then(user => {
      dispatch({
        type: SET_USER_REGISTRATION_ERROR,
        error: false
      });
    })
    .then(() => {
      callback();
    })
    .catch(err => {
      let error = ``;
      error = `A user with that ${err.response.data.key} already exists. Please try again.`
      return dispatch({
        type: SET_USER_REGISTRATION_ERROR,
        error: error
      });
    });
  };
};

export const logout = () => {
  return dispatch => {
    return Axios.post(`${HOST}/logout`)
    .then(success => {
      localStorage.removeItem(`user_id`);
      dispatch({
        type: SET_USER_ID,
        id: null
      });
      return dispatch({
        type: SET_USER_VALIDATION_ERROR,
        error: ``
      });
    });
  };
};
