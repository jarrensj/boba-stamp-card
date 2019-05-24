import {
    GET_STAMPCARD,
    STAMPCARD_ERROR,
    CLEAR_STAMPCARD,
    UPDATE_STAMPCARD
  } from '../actions/types';
  
  const initialState = {
    stampcard: null,
    loading: true,
    error: {}
  }
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch(type) {
      case GET_STAMPCARD:
      case UPDATE_STAMPCARD:
        return {
          ...state,
          stampcard: payload,
          loading: false
        }
      case STAMPCARD_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        }
      case CLEAR_STAMPCARD:
        return {
          ...state, 
          stampcard: null,
          loading: false
        }
      default:
        return state;
    }
  }