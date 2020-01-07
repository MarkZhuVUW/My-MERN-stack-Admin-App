import {
  LOADING,
  LOAD_SWAGGER_UI_ERROR,
  SWAGGER_UI_LOADED
} from "../actions/types";

const initialState = {
  swaggerUIDocs: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_SWAGGER_UI_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case SWAGGER_UI_LOADED:
      return {
        ...state,
        swaggerUIDocs: action.payload,
        isLoading: false
      };
    case LOADING:
      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  }
}
