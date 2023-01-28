/*---------- External ----------*/
import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
`;

export const InputLabel = styled.label`
  font-size: 0.75rem;
  margin-left: 0.5rem;
  font-weight: bold;
  color: #327560;
`;

export const InputFieldContainer = styled.div`
  border-radius: 1000px;
  position: relative;
  padding: 0 1rem;
  display: flex;
  box-shadow: 0 0 0.25rem 0.125rem #00000016;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 0 0.75rem 0.125rem #00000016;
  }

  &:focus-visible {
  }
`;

export const InputField = styled.input`
  padding: 0.75rem 0;
  background: none;
  border: none;
  outline: none;
  font-size: 1rem;
  flex: 1;
  color: black;

  &::placeholder {
    color: #9f9f9f;
  }
`;

export const InputRightItemContainer = styled.div`
  align-self: stretch;
  display: flex;
  margin-left: 0.75rem;
  justify-content: center;
  align-items: center;
`;
