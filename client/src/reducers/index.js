import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import developerReducer from "./developerReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  developer: developerReducer,
  admin: adminReducer
});
