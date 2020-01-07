import axios from "axios";
import { returnErrors } from "./errorActions";
import { SWAGGER_UI_LOADED, LOAD_SWAGGER_UI_ERROR, LOADING } from "./types";

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

/**
 * load swaggerUI swagger.json file.
 */
export const loadSwaggerUI = () => (dispatch, getState) => {
  dispatch({
    type: LOADING
  });
  axios
    .get("/api/swagger", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: SWAGGER_UI_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOAD_SWAGGER_UI_ERROR
      });
    });
};
