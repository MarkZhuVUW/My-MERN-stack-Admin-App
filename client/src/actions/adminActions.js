import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import {
  ALL_LOGS_LOADED,
  DOWNLOAD_LOGGED,
  LOAD_LOGS_ERROR,
  LOGIN_LOGGED,
  LOG_DELETED,
  PAGE_VIEW_LOGGED,
} from "./types";

export const logPageView = (id, pageViewLog) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({ log: pageViewLog });

  axios
    .patch(`/api/users/${id}/logs`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: PAGE_VIEW_LOGGED,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const logLoginSuccess = (id, loginLog) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({ log: loginLog });

  axios
    .patch(`/api/users/${id}/logs`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: LOGIN_LOGGED,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const logDownload = (id, downloadLog) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({ log: downloadLog });
  axios
    .patch(`/api/users/${id}/logs`, body, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DOWNLOAD_LOGGED,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all registered users
export const loadAllLogs = () => (dispatch, getState) => {
  // User loading
  axios
    .get(`/api/admin/logs`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ALL_LOGS_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOAD_LOGS_ERROR,
      });
    });
};

//as an admin I should be able to delete logs I guess?
export const deleteLog = (userid, logid) => (dispatch, getState) => {
  axios
    .delete(`/api/users/${userid}/logs/${logid}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: LOG_DELETED,
        payload: logid,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
