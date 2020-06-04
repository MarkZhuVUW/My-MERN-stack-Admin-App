import {combineReducers} from 'redux';
import adminReducer from './adminReducer';
import authReducer from './authReducer';
import developerReducer from './developerReducer';
import errorReducer from './errorReducer';
import utilityReducer from './utilityReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  developer: developerReducer,
  admin: adminReducer,
  utility: utilityReducer,
});
