import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  TFA_FAIL,
  TFA_SUCCESS,
  TFA_SETUP_SUCCESS,
  TFA_LOADED,
  TFA_ING,
  ALL_USERS_LOADED
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  UserLoaded: false,
  user: null,
  users: null,
  TFA: null,
  TFALoaded: false,
  isTFAing: false,
  allUsers: null
};

export default function(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        USER_LOADING: true
      };
    case ALL_USERS_LOADED:
      return {
        ...state,
        allUsers: action.payload,
        USER_LOADING: false
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        userLoaded: true,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userLoaded: false
      };
    case TFA_FAIL:
      return {
        ...state,
        TFA: null,
        isTFAing: false,
        TFALoaded: false
      };

    case TFA_LOADED:
      console.log(action.payload);
      return {
        ...state,
        TFA: action.payload,
        TFALoaded: true,
        isTFAing: false
      };
    case TFA_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        TFA: null,
        isTFAing: false
      };
    case TFA_SETUP_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        TFA: action.payload,
        TFALoaded: true,
        isTFAing: false
      };
    case TFA_ING:
      return {
        ...state,

        isTFAing: true
      };
    default:
      return state;
  }
}
