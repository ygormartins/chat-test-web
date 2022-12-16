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
  overflow: hidden;
  outline: none;
  border: none;
  flex-shrink: 0;
  background-color: #eaeaea;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "initial")};
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;

  [aria-busy="true"] {
  }
`;
