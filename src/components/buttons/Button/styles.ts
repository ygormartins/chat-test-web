/*---------- External ----------*/
import styled, { css } from "styled-components";
import { ButtonVariant } from "./types";

const PrimaryStyle = css<{ loadingState: boolean }>`
  background-color: teal;
  color: ${({ loadingState }) => (loadingState ? "transparent" : "white")};
`;

const SecondaryStyle = css<{ loadingState: boolean }>`
  background-color: transparent;
  color: ${({ loadingState }) => (loadingState ? "transparent" : "teal")};
`;

const DangerStyle = css<{ loadingState: boolean }>`
  background-color: #ff2044;
  color: ${({ loadingState }) => (loadingState ? "transparent" : "white")};
`;

export const ButtonContainer = styled.button<{
  loadingState: boolean;
  disabled: boolean;
  variant: ButtonVariant;
}>`
  border: none;
  outline: none;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1.0")};
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  align-self: center;
  border-radius: 1000px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 0 0.25rem 0.125rem #00000016;

  &:hover {
    ${({ disabled }) =>
      disabled
        ? css`
            cursor: initial;
          `
        : css`
            opacity: 0.75;
          `}
  }

  &:focus-visible {
    outline: 0.125rem solid black;
  }

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return PrimaryStyle;
      case "secondary":
        return SecondaryStyle;
      case "danger":
        return DangerStyle;
    }
  }}
`;

export const LoadingContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
