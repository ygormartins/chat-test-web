/*---------- External ----------*/
import styled, { keyframes } from "styled-components";

/*---------- Animations ----------*/
const growAnimation = keyframes`
  0% {
	height: 0;
  }

  100% {
	height: 7rem;
  }
`;

export const ModalContainer = styled.div.attrs({ tabIndex: 0 })`
  background-color: white;
  box-shadow: 0 0 0.75rem 0.125rem #00000016;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  width: 450px;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const ModalTitle = styled.h3`
  color: #327560;
  font-size: 1.25rem;
  margin-bottom: 2rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const PreviewContainer = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const UserInfoCard = styled.div`
  overflow: hidden;
  display: flex;
  width: 75%;
  gap: 0.75rem;
  align-items: center;
  height: 7rem;
  animation: ${growAnimation} 200ms linear;

  @media screen and (max-width: 800px) {
    width: auto;
  }
`;

export const UserInfoSection = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export const UserNameTitle = styled.h4`
  color: #000000;
  font-weight: normal;
  font-size: 1.15rem;
`;

export const UserEmailSubtitle = styled.p`
  color: #3d3d3d;
  font-weight: normal;
`;

export const UserNotFoundLabel = styled.p`
  color: #ff2044;
  margin: 0.5rem 0;
  width: 100%;
  text-align: start;
`;
