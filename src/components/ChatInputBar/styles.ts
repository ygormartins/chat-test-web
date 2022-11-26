/*---------- External ----------*/
import styled, { css, keyframes } from "styled-components";

/*---------- Animations ----------*/
const flightAnimation = keyframes`
  0% {
 	transform: translateX(0) translateY(0);
  }

  50% {
 	transform: translateX(200%) translateY(-200%);
  }

  50.001% {
	transform: translateX(-200%) translateY(200%);
  }

  100% {
	transform: translateX(0) translateY(0);
  }
`;

export const ExternalContainer = styled.div`
  display: flex;
  padding: 0.5rem 1.25rem 1.25rem;
`;

export const InternalContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 1000rem;
  flex-grow: 1;
  box-shadow: 0 0 0.75rem 0.125rem #00000016;
  overflow: hidden;
  align-items: center;
`;

export const AttachmentsSection = styled.div`
  padding: 0.5rem;
  padding-left: 0.75rem;
  display: flex;
`;

export const MessageInputSection = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
`;

export const TextInput = styled.input`
  flex: 1;
  height: 100%;
  padding: 0.75rem;
  border: none;
  outline: none;
  font-size: 1rem;
  color: black;

  &::placeholder {
    font-size: 1rem;
    color: #8a8a8a;
  }
`;

export const ActionSection = styled.button<{ animating: boolean }>`
  padding: 0 1rem 0 0.75rem;
  align-items: center;
  display: flex;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  position: relative;

  &::before {
    content: "";
    inset: 0;
    background-color: black;
    opacity: 0;
    position: absolute;
    transition: opacity 200ms;
  }

  &[aria-disabled="false"] {
    cursor: pointer;

    &:hover,
    &:focus-visible {
      &::before {
        opacity: 0.1;
      }
    }
  }

  ${({ animating }) =>
    !animating
      ? css`
          &[aria-disabled="true"] {
            opacity: 0.5;
            cursor: default;
          }
        `
      : null}

  ${({ animating }) =>
    animating
      ? css`
          & > * {
            animation: ${flightAnimation} 700ms;
          }
        `
      : null}
`;

export const HorizontalSeparator = styled.div`
  width: 1px;
  height: calc(100% - (0.5rem * 2));
  margin: 0.5rem 0;
  background-color: #e1e1e1;
`;
