import {
  ALL_LOGS_LOADED,
  DOWNLOAD_LOGGED,
  LOGIN_LOGGED,
  LOG_DELETED,
  PAGE_VIEW_LOGGED,
} from "../actions/types";

const initialState = {
  swaggerUIDocs: null,
  isLoading: false,
  allLogs: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOGGED:
    case DOWNLOAD_LOGGED:
    case PAGE_VIEW_LOGGED:
    case LOG_DELETED:
      return {
        ...state,
        isLoading: false,
      };
    case ALL_LOGS_LOADED:
      return {
        ...state,
        allLogs: action.payload,
        isLoading: false,
      };

    default:
      return { ...state };
  }
}
