/*---------- External ----------*/
import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.4rem;
`;

export const InputLabel = styled.label`
  font-size: 0.75rem;
`;

export const InputField = styled.input`
  background: none;
  border: 0.1rem solid #9f9f9f;
  border-radius: 0.25rem;
  padding: 0.5rem;
  outline: none;
  color: black;
  font-size: 1rem;

  &:focus {
    border: 0.125rem solid teal;
  }

  &::placeholder {
    color: #9f9f9f;
  }
`;
