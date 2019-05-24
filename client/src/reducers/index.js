import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import stamps from './stampcard';

export default combineReducers({
  alert,
  auth,
  stamps
});