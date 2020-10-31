import { combineReducers } from 'redux';
import appReducer from '../features/app/app';

export default combineReducers({
  app: appReducer
});
