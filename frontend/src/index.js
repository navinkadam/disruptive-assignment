import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import { rootStore } from "./redux-store";

import "./index.css";
import "./tailwindcss.css";

const renderApp =
  process.env.NODE_ENV === "development" ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  );

ReactDOM.render(
  <Provider store={rootStore}>{renderApp}</Provider>,
  document.getElementById("root")
);
