/*---------- External ----------*/
import styled from "styled-components";

export const ButtonContainer = styled.button<{
  size: number;
  background: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  background-color: ${({ background }) => background};
  border-radius: 50%;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: "";
    inset: 0;
    background-color: black;
    opacity: 0;
    position: absolute;
    transition: opacity 200ms;
  }

  &:hover {
    &::before {
      opacity: 0.1;
    }
  }
`;
