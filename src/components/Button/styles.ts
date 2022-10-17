/*---------- External ----------*/
import styled from "styled-components";

export const ButtonContainer = styled.button`
  border: none;
  outline: none;
  background-color: teal;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  align-self: center;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }

  &:focus {
    outline: 0.125rem solid black;
  }
`;
