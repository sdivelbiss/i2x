import styled from "styled-components";

const Button = styled.button`
  background: #fff;
  border: 1px solid #ddd;
  transition: all 0.2s ease-in;
  color: #666;
  box-shadow: 0 0 8px rgba(216, 223, 233, 1);
  text-transform: uppercase;
  font-size: 0.8rem;
  border-radius: 4px;
  min-width: 100px;
  padding: 8px 10px;
  &:hover {
    background: #1daeeb;
    border: 1px solid #1daeeb;
    color: #fff;
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.45;
    background: #fff;
    border: 1px solid #efefef;
    color: #777;
    &:hover {
      cursor: not-allowed;
    }
  }
`;

export default Button;
