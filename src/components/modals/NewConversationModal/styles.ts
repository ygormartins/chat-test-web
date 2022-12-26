/*---------- External ----------*/
import styled from "styled-components";

export const ModalContainer = styled.div`
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
  color: teal;
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
`;
