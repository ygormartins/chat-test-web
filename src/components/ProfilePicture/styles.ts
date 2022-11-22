/*---------- External ----------*/
import styled from "styled-components";

export const Container = styled.div<{
  size: number;
  round: boolean;
  clickable: boolean;
}>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${({ round }) => (round ? "50%" : "0")};
  outline: none;
  border: none;
  flex-shrink: 0;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "initial")};

  // TODO: Add profile picture feature
  background-color: #37b5a4;
`;
