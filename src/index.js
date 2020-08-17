import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./reducers/store";
import { ASRContext } from "./asr/useARSClient";
import { ASRClient } from "./asr/ASRClient";

import "./index.css";

const asrClient = new ASRClient("wss://vibe-rc.i2x.ai");

ReactDOM.render(
  <ASRContext.Provider value={asrClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ASRContext.Provider>,
  document.getElementById("root")
);
