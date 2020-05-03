import {
  MY_GITHUB_USER_LOADED,
  MY_GITHUB_USER_LOAD_FAILURE,
} from "../actions/types";

const initialState = {
  githubUser: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_GITHUB_USER_LOADED:
      return {
        ...state,
        githubUser: action.payload,
      };
    case MY_GITHUB_USER_LOAD_FAILURE:
      return {
        ...state,
        // TODO maybe do something in the future.
      };
    default:
      return {
        ...state,
      };
  }
}
