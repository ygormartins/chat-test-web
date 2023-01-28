/*---------- External ----------*/
import styled, { keyframes } from "styled-components";

/*---------- Animation ----------*/
const blurAnimation = keyframes`
  0% {
  	backdrop-filter: blur(0px);
  }

  100% {
	backdrop-filter: blur(4px);
  }
`;

export const ModalBackground = styled.div`
  position: absolute;
  inset: 0;
  padding: 0 4rem;
  background-color: #00000000;
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${blurAnimation} 300ms ease-in-out;

  @media screen and (max-width: 800px) {
    padding: 0 1rem;
  }
`;
