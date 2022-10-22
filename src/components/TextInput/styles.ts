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
  color: teal;
`;

export const InputField = styled.input`
  border-radius: 1000px;
  background: none;
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  color: black;
  font-size: 1rem;
  box-shadow: 0 0 0.25rem 0.125rem #00000016;

  &:hover {
    box-shadow: 0 0 0.75rem 0.125rem #00000016;
  }

  &:focus {
  }

  &::placeholder {
    color: #9f9f9f;
  }
`;
