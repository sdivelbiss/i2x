import React from "react";
import styled from "styled-components";

import Logo from "../../img/i2x-logo.svg";

const StyledHeader = styled.div`
  background: #f5f6f9;
  box-shadow: 0px 4px 10px rgba(59, 129, 251, 0);
  transition: ease 0.5s;
  z-index: 10;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  img {
    width: 42px;
  }
`;

const StyledTitle = styled.div`
  font-weight: 300;
  font-size: 1.5rem;
`;

function Header(props) {
  return (
    <StyledHeader>
      <img src={Logo} alt={"logo"} />
      <StyledTitle>Transcript Log</StyledTitle>
    </StyledHeader>
  );
}

Header.propTypes = {};

export default Header;
