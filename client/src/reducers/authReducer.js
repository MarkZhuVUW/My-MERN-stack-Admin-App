import {
  ALL_USERS_LOADED,
  AUTH_ERROR,
  CLEAR_SUCCESS_MSG,
  GITHUB_SIGNIN_FAIL,
  GITHUB_SIGNIN_SUCCESS,
  GITHUB_USER_ADAPTED,
  GITHUB_USER_LOADED,
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
  USER_LOADING,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  userLoaded: false,
  user: null,
  TFA: null,
  TFALoaded: false,
  successMsg: null,
  allUsers: [],
  authenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_SUCCESS_MSG:
      return {
        ...state,
        successMsg: null,
      };

    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ALL_USERS_LOADED:
      return {
        ...state,
        allUsers: action.payload,
        isLoading: false,
      };
    case USER_LOADED:
    case GITHUB_USER_LOADED:
    case GITHUB_USER_ADAPTED:
      return {
        ...state,
        isLoading: false,
        userLoaded: true,
        user: action.payload,
      };

    case USER_DELETED:
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => {
          return user._id !== action.payload;
        }),
      };
    case REGISTER_SUCCESS:
      return { ...state, successMsg: "registration successful" };
    case LOGIN_SUCCESS:
      // console.log(action.payload.token);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        userLoaded: true,
      };
    case GITHUB_SIGNIN_SUCCESS:
      localStorage.setItem("githubAccessToken", action.payload.access_token);

      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("authenticated");
      localStorage.removeItem("githubAccessToken");

      return {
        ...initialState,
        token: localStorage.getItem("token"),
        authenticated: false,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case GITHUB_SIGNIN_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("authenticated");
      localStorage.removeItem("githubAccessToken");
      return {
        ...state,
        // token: null,
        user: null,
        isLoading: false,
        userLoaded: false,
        token: localStorage.getItem("token"),
        authenticated: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case TFA_SETUP_FAIL:
      return {
        ...state,
      };
    //do not change state if verification failed
    case TFA_VERIFY_FAIL:
      return {
        ...state,
      };
    case TFA_LOAD_FAIL:
      return {
        ...state,
      };
    case TFA_SETUP_SUCCESS:
    case TFA_LOADED:
      return {
        ...state,
        TFA: action.payload,
        TFALoaded: true,
      };
    case TFA_VERIFED:
      localStorage.setItem("authenticated", true);

      return {
        ...state,
        TFA: null,
        authenticated: true,
      };

    // case TFA_ING:
    //   return {
    //     ...state,
    //     isTFAing: true
    //   };

    default:
      return {
        ...state,
        authenticated:
          localStorage.getItem("authenticated") === "true",
      };
  }
}
