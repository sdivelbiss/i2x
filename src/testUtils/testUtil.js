import React from "react";
import { render as rtlRender } from "@testing-library/react";
import initStore from "../reducers/createStore";
import { Provider } from "react-redux";
import globalReducer, {
  globalStore_initialState
} from "../stores/globalStore/GlobalStore";
import { ASRContext } from "../asr/useARSClient";
import { mockAsrClient } from "./asrClient";

function render(
  ui,
  {
    initialState = globalStore_initialState,
    store = initStore(globalReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <ASRContext.Provider value={mockAsrClient}>
        <Provider store={store}>{children}</Provider>
      </ASRContext.Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
