import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Button from "../button/Button";
import { globalStore_setPhrases } from "../../stores/globalStore/GlobalStore";
import CurrentPhrases from "./components/currentPhrases/CurrentPhrases";

const StyledPhraseWrapper = styled.div`
  padding: 20px 0px;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const AddPhraseWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 2px 5px;
  }
`;

const PhraseTitle = styled.div`
  font-weight: 300;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  padding: 10px 0;
`;

function Phrases() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  // set the new phrase to the store and then clear the input value
  const addPhrase = () => {
    dispatch(globalStore_setPhrases(value));
    setValue("");
  };
  return (
    <StyledPhraseWrapper>
      <PhraseTitle>Search Phrases</PhraseTitle>
      <AddPhraseWrapper>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          data-testid={"add-phrase-input"}
        />
        <Button onClick={addPhrase} data-testid={"add-phrase"}>
          Add
        </Button>
      </AddPhraseWrapper>
      <CurrentPhrases />
    </StyledPhraseWrapper>
  );
}

export default Phrases;
