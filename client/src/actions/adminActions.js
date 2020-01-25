import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
import {
  DOWNLOAD_LOGGED,
  LOGIN_LOGGED,
  ALL_LOGS_LOADED,
  LOAD_LOGS_ERROR,
  LOG_DELETED
} from "./types";
import uuidv1 from "uuid";
// Check token & load user
export const logLoginSuccess = (id, loginLog) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({ log: loginLog });

  axios
    .patch(`/api/users/${id}/logs`, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: LOGIN_LOGGED
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Check token & load user
export const logDownload = (id, downloadLog) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({ log: downloadLog });
  axios
    .patch(`/api/users/${id}/logs`, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DOWNLOAD_LOGGED
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all registered users
export const loadAllLogsForSpecificUser = id => (dispatch, getState) => {
  // User loading
  axios
    .get(`/api/admin/logs`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ALL_LOGS_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOAD_LOGS_ERROR
      });
    });
};

//as an admin I should be able to delete logs I guess?
export const deleteLog = (userid, logid) => (dispatch, getState) => {
  axios
    .delete(`/api/users/${userid}/logs/${logid}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: LOG_DELETED,
        payload: logid
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
