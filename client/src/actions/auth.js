import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_STAMPCARD,
  UPDATE_AUTH,
  USER_ERROR
} from './types';

import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/user', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
}

// Login User
export const login = ( email, password ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  const body = JSON.stringify({ email, password });
  
  try {
    const res = await axios.post('/api/auth', body, config);
  
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
  
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout 
export const logout = () => dispatch => new Promise(function(resolve, reject) {
  dispatch({ type: CLEAR_STAMPCARD });
  dispatch({ type: LOGOUT });
});

// change user's email
export const changeEmail = ( formData, history ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify(formData);

  try {
    const res = await axios.put('/api/user/email', body, config);

    dispatch({
      type: UPDATE_AUTH,
      payload: res.data
    });

    dispatch(setAlert('Email address updated', 'success'));

    dispatch(loadUser());
    history.push('/dashboard');

  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: USER_ERROR
    });
  }
}

// change user's password
export const changePassword = ( formData, history ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify(formData);

  try {
    const res = await axios.put('/api/user/password', body, config);

    dispatch({
      type: UPDATE_AUTH,
      payload: res.data
    });

    dispatch(setAlert('Password updated', 'success'));

    history.push('/dashboard');

  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: USER_ERROR
    });
  }
}