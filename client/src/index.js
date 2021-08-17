import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
require("dotenv").config();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div id="backGround"></div>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
