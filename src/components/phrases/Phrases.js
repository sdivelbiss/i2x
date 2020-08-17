import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { compact } from "lodash";

import Button from "../button/Button";
import {
  globalStore_getPhrases,
  globalStore_setPhrases,
  globalStore_deletePhrase
} from "../../stores/globalStore/GlobalStore";
import { useASRClient } from "../../asr/useARSClient";

const PhraseItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledPhrase = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 2px 10px;
  margin: 5px;
  span {
    &:hover {
      cursor: pointer;
    }
  }
`;

const CurrentPhrases = () => {
  const ASRInstance = useASRClient();
  const dispatch = useDispatch();
  const phrases = useSelector((state) => globalStore_getPhrases(state));
  useEffect(() => {
    if (ASRInstance.isStarted()) {
      ASRInstance.updateSpottingConfig(compact(phrases));
    }
  }, [phrases]);

  const deletePhrase = (phrase) => {
    dispatch(globalStore_deletePhrase(phrase));
  };
  return (
    <PhraseItemWrapper>
      {phrases.map((phrase) => (
        <StyledPhrase key={phrase}>
          {phrase}{" "}
          <span
            onClick={() => deletePhrase(phrase)}
            aria-label={"delete phrase"}
            role="img"
          >
            ✖️
          </span>
        </StyledPhrase>
      ))}
    </PhraseItemWrapper>
  );
};

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
`;

function Phrases() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const addPhrase = () => {
    dispatch(globalStore_setPhrases(value));
    setValue("");
  };
  return (
    <StyledPhraseWrapper>
      <PhraseTitle>Phrases</PhraseTitle>
      <AddPhraseWrapper>
        <input onChange={(e) => setValue(e.target.value)} value={value} />
        <Button onClick={addPhrase}>Add</Button>
      </AddPhraseWrapper>
      <CurrentPhrases />
    </StyledPhraseWrapper>
  );
}

export default Phrases;
