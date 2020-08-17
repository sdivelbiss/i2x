import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { createStore } from "redux";
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from "../../../testUtils/testUtil";
import Phrases from "../Phrases";

describe("<Phrases/>", () => {
  test("Can add a phrase", () => {
    render(<Phrases />);
    const input = screen.getByTestId("add-phrase-input");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByTestId("add-phrase"));
    expect(screen.getByText("test")).toBeInTheDocument();
  });
  test("Can delete a phrase", () => {
    render(<Phrases />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    let phrases = screen.getAllByTestId("delete-phrase");
    fireEvent.click(phrases[phrases.length - 1], "Hello");
    let phrasesWithDeleted = screen.getAllByTestId("delete-phrase");
    expect(phrasesWithDeleted.length).toEqual(phrases.length - 1);
  });
});
