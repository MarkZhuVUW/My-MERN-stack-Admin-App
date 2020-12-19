import axios from "axios";
import { returnErrors } from "./errorActions";
import { LOAD_SWAGGER_UI_ERROR, SWAGGER_UI_LOADED } from "./types";

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const { token } = getState().auth;

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
 * @return {function(...[*]=)}
 */
export const loadSwaggerUI = () => (dispatch, getState) => {
  axios
    .get("/api/swagger", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: SWAGGER_UI_LOADED,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: LOAD_SWAGGER_UI_ERROR
      });
    });
};
