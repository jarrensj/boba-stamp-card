import {
    GET_STAMPCARD,
    STAMPCARD_ERROR
  } from '../actions/types';
  
  const initialState = {
    stampcard: null,
    repos: [],
    loading: true,
    error: {}
  }
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch(type) {
      case GET_STAMPCARD:
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
      default:
        return state;
    }
  }