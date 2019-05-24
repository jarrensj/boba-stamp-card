import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_STAMPCARD,
  STAMPCARD_ERROR,
  UPDATE_STAMPCARD
} from './types';

// Get current user's stamp card 
export const getStampcard = () => async dispatch => {
  try {
    const res = await axios.get('/api/stamps/me');

    dispatch({
      type: GET_STAMPCARD,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STAMPCARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// add points user's stamp card 
export const addPoints = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/stamps', formData, config);

    dispatch({
      type: UPDATE_STAMPCARD,
      payload: res.data
    });

    dispatch(setAlert('Stamp Card updated', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: STAMPCARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
