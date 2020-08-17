import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import StatusIndicator from "../statusIndicator/StatusIndicator";
import Button from "../../../button/Button";
import {
  globalStore_getConnectionStatus,
  globalStore_setConnectionStatus,
  globalStore_setLogResults,
  globalStore_getPhrases
} from "../../../../stores/globalStore/GlobalStore";
import { STATUS } from "../../../../constants/constants";
import { useASRClient } from "../../../../asr/useARSClient";
import { waitForFunc } from "../../../../utils/waitForFunc";

const StyledTranscriptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  align-items: baseline;
  #transcript-status {
    display: flex;
    font-size: 1.5rem;
    font-weight: 300;
    align-items: center;
  }
`;

const StatusArea = styled.div`
  display: flex;
`;

function TranscriptHeader() {
  const dispatch = useDispatch();
  const ASRInstance = useASRClient();

  const status = useSelector((state) => globalStore_getConnectionStatus(state));
  const phrases = useSelector((state) => globalStore_getPhrases(state));

  const statusText = () => {
    switch (status) {
      case STATUS.ONLINE:
        return "Session started";

      case STATUS.OFFLINE:
        return "Disconnected";

      case STATUS.ERROR:
        return "Error";

      default:
        return "Disconnected";
    }
  };

  const onMessage = (error, results) => {
    if (error) {
      dispatch(globalStore_setConnectionStatus(STATUS.ERROR));
    } else {
      dispatch(globalStore_setLogResults(results));
    }
  };

  const startSession = async () => {
    try {
      ASRInstance.start(phrases, onMessage);
      await waitForFunc(() => ASRInstance.isStarted());
      dispatch(globalStore_setConnectionStatus(STATUS.ONLINE));
    } catch (error) {
      dispatch(globalStore_setConnectionStatus(STATUS.ERROR));
    }
  };

  const stopSession = () => {
    ASRInstance.stop();
    dispatch(globalStore_setConnectionStatus(STATUS.OFFLINE));
  };

  const toggleSession = () => {
    if (status === STATUS.ONLINE) {
      stopSession();
    } else {
      startSession();
    }
  };

  return (
    <StyledTranscriptHeader>
      <div id={"transcript-status"} data-testid={"transcript-status"}>
        Status: {statusText()} <StatusIndicator status={status} />
      </div>
      <StatusArea>
        <Button onClick={toggleSession} data-testid={"session-button"}>
          {status === STATUS.OFFLINE ? "Start" : "Stop"}
        </Button>
      </StatusArea>
    </StyledTranscriptHeader>
  );
}

export default TranscriptHeader;
