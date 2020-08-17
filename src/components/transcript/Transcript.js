import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { transformLog } from "../../utils/util";
import TranscriptHeader from "./components/transcriptHeader/TranscriptHeader";
import { globalStore_getResults } from "../../stores/globalStore/GlobalStore";

const TranscriptWrapper = styled.div`
  padding: 20px 0;
`;

const StyledTranscript = styled.div`
  width: 45vw;
  height: 600px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const TextBubble = styled.div`
  position: relative;
  background: #b7cffb;
  border-radius: 0.4em;
  width: 50%;
  margin: 10px;
  padding: 10px;
  align-self: flex-end;
  :after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 0.719em solid transparent;
    border-left-color: #b7cffb;
    border-right: 0;
    border-bottom: 0;
    margin-top: -0.359em;
    margin-right: -0.719em;
  }
  .spotted-word {
    background-color: #ffff00;
    font-weight: 600;
  }
`;

export default function Transcript({ toggle }) {
  const [transformedLog, setTransformedLog] = useState([]);
  const log = useSelector((state) => globalStore_getResults(state));

  useEffect(() => {
    const filterLog = log.filter((l) => l.transcript);
    const response = transformLog(filterLog);
    setTransformedLog(response);
  }, [log]);

  return (
    <TranscriptWrapper>
      <TranscriptHeader status={"online"} toggle={toggle} />

      <StyledTranscript>
        {transformedLog.map(({ text }, i) =>
          text ? <TextBubble key={i}>{ReactHtmlParser(text)}</TextBubble> : null
        )}
      </StyledTranscript>
    </TranscriptWrapper>
  );
}
