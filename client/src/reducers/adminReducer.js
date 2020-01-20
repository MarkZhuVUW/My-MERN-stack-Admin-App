import {
  LOADING,
  DOWNLOAD_LOGGED,
  LOGIN_LOGGED,
  ALL_LOGS_LOADED,
  LOAD_LOGS_ERROR
} from "../actions/types";

const initialState = {
  swaggerUIDocs: null,
  isLoading: false,
  allLogs: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOGGED:
    case DOWNLOAD_LOGGED:
      return {
        ...state,
        isLoading: false
      };
    case ALL_LOGS_LOADED:
      return {
        ...state,
        allLogs: action.payload,
        isLoading: false
      };
    case LOADING:
      return {
        ...state,
        isLoading: true
      };

    default:
      return { ...state };
  }
}
