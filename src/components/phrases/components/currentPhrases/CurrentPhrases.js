import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { compact } from "lodash";

import {
  globalStore_getPhrases,
  globalStore_deletePhrase
} from "../../../../stores/globalStore/GlobalStore";
import { useASRClient } from "../../../../asr/useARSClient";

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
            data-testid={"delete-phrase"}
          >
            ✖️
          </span>
        </StyledPhrase>
      ))}
    </PhraseItemWrapper>
  );
};

export default CurrentPhrases;
