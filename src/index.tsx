import React, { StrictMode } from "react";

import ReactDOM from "react-dom/client";
import "regenerator-runtime";
import "config/configureMobX";
import "./styles/styles.scss";
import { BrowserRouter } from "react-router-dom";

import App from "./App/App";

const root = document.getElementById("root");

if (root)
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );

if (module.hot) {
  module.hot.accept();
}
