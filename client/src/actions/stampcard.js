import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_STAMPCARD,
  STAMPCARD_ERROR
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