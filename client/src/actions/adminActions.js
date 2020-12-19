import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import {
  ALL_LOGS_LOADED,
  DOWNLOAD_LOGGED,
  LOAD_LOGS_ERROR,
  LOGIN_LOGGED,
  LOG_DELETED,
  PAGE_VIEW_LOGGED
} from "./types";

export const logPageView = (id, pageViewLog, isOauth) => (
  dispatch,
  getState
) => {
  // Request body
  const body = JSON.stringify({ log: pageViewLog, isOauth });

  return axios
    .patch(`/api/users/${id}/logs`, body, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: PAGE_VIEW_LOGGED
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};

export const logLoginSuccess = (id, loginLog, isOauth) => (
  dispatch,
  getState
) => {
  // Request body
  const body = JSON.stringify({ log: loginLog, isOauth });

  return axios
    .patch(`/api/users/${id}/logs`, body, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: LOGIN_LOGGED
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};

export const logDownload = (id, downloadLog, isOauth) => (
  dispatch,
  getState
) => {
  // Request body
  const body = JSON.stringify({ log: downloadLog, isOauth });
  return axios
    .patch(`/api/users/${id}/logs`, body, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: DOWNLOAD_LOGGED
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};

// get all registered users
export const loadAllLogs = () => (dispatch, getState) => {
  // User loading
  return axios
    .get(`/api/admin/logs`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ALL_LOGS_LOADED,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: LOAD_LOGS_ERROR
      });
    });
};

// as an admin I should be able to delete logs I guess?
export const deleteLog = (userId, logId) => (dispatch, getState) => {
  return axios
    .delete(`/api/users/${userId}/logs/${logId}`, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: LOG_DELETED,
        payload: logId
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data.msg, err.response.status))
    );
};
