import styled, { keyframes } from "styled-components";
import { rgba } from "polished";

import { STATUS, STATUS_COLORS } from "../../../../constants/constants";

const pulse = (color) => keyframes`
  0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 ${rgba(color, 0.7)};
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px ${rgba(color, 0)};
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 ${rgba(color, 0)};
	}
`;

const StatusIndicator = styled.div`
  background: ${(props) => STATUS_COLORS[props.status]};
  border-radius: 50%;
  margin: 0 10px;
  height: 10px;
  width: 10px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: ${(props) =>
      props.status === STATUS.ONLINE
        ? pulse(STATUS_COLORS[props.status])
        : null}
    2s infinite;
`;

export default StatusIndicator;
