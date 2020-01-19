import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

//check if there is network connection. This is used for logging user action.
// window.addEventListener("offline", () => {
//   store.dispatch({
//     type: "UPDATE_CONNECTIVITY",
//     payload: false
//   });
// });

// window.addEventListener("online", () => {
//   store.dispatch({
//     type: "UPDATE_CONNECTIVITY",
//     payload: true
//   });
// });
