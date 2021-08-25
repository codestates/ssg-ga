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
      <div id="backGround">
        <div id="effectContainer">
          <div id="waveContainer">
            <div id="firstWave"></div>
            <div id="secondWave"></div>
            <div id="thirdWave"></div>
          </div>
        </div>
      </div>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
