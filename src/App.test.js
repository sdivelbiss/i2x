import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AppContainer from "./App";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { ASRContext } from "./asr/useARSClient";
import { mockAsrClient } from "./testUtils/asrClient";

describe("<App/>", () => {
  const App = () => (
    <ASRContext.Provider value={mockAsrClient}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </ASRContext.Provider>
  );
  it("renders App", () => {
    const { queryByTestId } = render(<App />);

    // check status text
    expect(queryByTestId("transcript-status").textContent).toBe(
      "Status: Disconnected "
    );

    // check button text
    expect(queryByTestId("session-button").textContent).toBe("Start");
  });

  it("changes status on click", async () => {
    const { queryByTestId } = render(<App />);

    const button = queryByTestId("session-button");
    // make sure button exists
    expect(button).not.toBeNull();

    // click on button to start the session
    fireEvent.click(button);

    // wait
    await waitFor(() =>
      expect(queryByTestId("session-button").textContent).toBe("Stop")
    );

    // check if the header text is changed too
    expect(queryByTestId("transcript-status").textContent).toBe(
      "Status: Session started "
    );
  });
});
