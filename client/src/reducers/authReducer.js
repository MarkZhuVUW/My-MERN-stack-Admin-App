import {
  ALL_USERS_LOADED,
  AUTH_ERROR,
  LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  TFA_LOADED,
  TFA_LOAD_FAIL,
  TFA_SETUP_FAIL,
  TFA_SETUP_SUCCESS,
  TFA_VERIFED,
  TFA_VERIFY_FAIL,
  USER_DELETED,
  USER_LOADED,
  USER_LOADING
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  userLoaded: false,
  user: null,
  TFA: null,
  TFALoaded: false,
  isTFAing: false,
  successMsg: null,
  allUsers: [],
  authenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ALL_USERS_LOADED:
      return {
        ...state,
        allUsers: action.payload,
        isLoading: false
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        userLoaded: true,
        user: action.payload
      };
    case USER_DELETED:
      return {
        ...state,
        allUsers: state.allUsers.filter(user => {
          return user._id !== action.payload;
        })
      };
    case REGISTER_SUCCESS:
      return { ...state, successMsg: "registration successfull" };
    case LOGIN_SUCCESS:
      console.log(action.payload.token);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        userLoaded: true
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("authenticated");

      return {
        ...initialState,
        token: localStorage.getItem("token"),
        authenticated: false
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("authenticated");
      return {
        ...state,
        // token: null,
        user: null,
        isLoading: false,
        userLoaded: false,
        token: localStorage.getItem("token"),
        authenticated: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case TFA_SETUP_FAIL:
      return {
        ...state,
        isTFAing: false
      };
    //do not change state if verification failed
    case TFA_VERIFY_FAIL:
      return {
        ...state,
        isTFAing: false
      };
    case TFA_LOAD_FAIL:
      return {
        ...state,
        isTFAing: false
      };
    case TFA_SETUP_SUCCESS:
    case TFA_LOADED:
      return {
        ...state,
        TFA: action.payload,
        TFALoaded: true,
        isTFAing: false
      };
    case TFA_VERIFED:
      localStorage.setItem("authenticated", true);

      return {
        ...state,
        TFA: null,
        isTFAing: false,
        authenticated: true
      };

    // case TFA_ING:
    //   return {
    //     ...state,
    //     isTFAing: true
    //   };

    case TFA_SETUP_SUCCESS:
      return {
        ...state,
        TFA: action.payload,
        TFALoaded: true,
        isTFAing: false
      };
    default:
      return {
        ...state,
        authenticated:
          localStorage.getItem("authenticated") === "true" ? true : false
      };
  }
}
