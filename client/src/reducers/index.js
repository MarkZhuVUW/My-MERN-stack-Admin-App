import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import developerReducer from "./developerReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  developer: developerReducer
});
