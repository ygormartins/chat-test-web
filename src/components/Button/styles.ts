/*---------- External ----------*/
import styled from "styled-components";

export const ButtonContainer = styled.button<{
  loadingState: boolean;
  disabled: boolean;
}>`
  border: none;
  outline: none;
  background-color: teal;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1.0")};
  color: ${({ loadingState }) => (loadingState ? "transparent" : "white")};
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  align-self: center;
  border-radius: 1000px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 0 0.25rem 0.125rem #00000016;

  &:hover {
    opacity: 0.75;
  }

  &:focus-visible {
    outline: 0.125rem solid black;
  }
`;

export const LoadingContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
