import React from "react";

import styled from "styled-components";

import Transcript from "./components/transcript/Transcript";
import Phrases from "./components/phrases/Phrases";
import Header from "./components/header/Header";

const AppWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const AppBody = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-items: center;
  margin: 0 10%;
`;

export default function App() {
  return (
    <AppWrapper>
      <Header />
      <AppBody>
        <Transcript />
        <Phrases />
      </AppBody>
    </AppWrapper>
  );
}
