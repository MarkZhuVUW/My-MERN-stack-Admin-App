import {
  GITHUB_USER_LOADED,
  MY_GITHUB_USER_LOADED,
  MY_GITHUB_USER_LOAD_FAILURE,
  USER_LOADING,
} from "./types";

export const getGithubUser = (username) => (dispatch) => {
  // User loading
  dispatch({ type: USER_LOADING });

  fetch(`https://api.github.com/users/${username}`).then((res) => {
    res
      .json()
      .then((user) => {
        return username === "MarkZhuVUW"
          ? dispatch({
              type: MY_GITHUB_USER_LOADED,
              payload: user,
            })
          : dispatch({
              type: GITHUB_USER_LOADED,
              payload: user,
            });
      })
      .catch((err) => {
        dispatch({
          type: MY_GITHUB_USER_LOAD_FAILURE,
        });
      });
  });
};

export const getGithubRepos = (username) => (dispatch) => {
  // User loading
  dispatch({ type: USER_LOADING });

  fetch(`https://api.github.com/users/${username}`).then((res) => {
    res
      .json()
      .then((user) => {
        return username === "MarkZhuVUW"
          ? dispatch({
              type: MY_GITHUB_USER_LOADED,
              payload: user,
            })
          : dispatch({
              type: GITHUB_USER_LOADED,
              payload: user,
            });
      })
      .catch((err) => {
        dispatch({
          type: MY_GITHUB_USER_LOAD_FAILURE,
        });
      });
  });
};
