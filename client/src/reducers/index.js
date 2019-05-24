import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import stampcard from './stampcard';

export default combineReducers({
  alert,
  auth,
  stampcard
});