import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  TFA_SETUP_FAIL,
  TFA_VERIFY_FAIL,
  TFA_SUCCESS,
  TFA_SETUP_SUCCESS,
  TFA_LOADED,
  TFA_ING,
  ALL_USERS_LOADED,
  TFA_LOAD_FAIL,
  LOAD_SWAGGER_UI_ERROR,
  SWAGGER_UI_LOADED
} from "../actions/types";

const initialState = {
  swaggerUIDocs: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_SWAGGER_UI_ERROR:
      return {
        ...state
      };
    case SWAGGER_UI_LOADED:
      return {
        ...state,
        swaggerUIDocs: action.payload
      };

    default:
      return state;
  }
}
