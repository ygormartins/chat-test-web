/*---------- External ----------*/
import styled from "styled-components";
import { Link } from "react-router-dom";

export const FormContainer = styled.div`
  width: 40%;
  max-width: 600px;
  padding: 2rem 1rem;
  box-shadow: 0 0 0.25rem 0.125rem #00000016;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  background-color: white;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }

  @media screen and (max-width: 800px) {
    border-radius: 0;
    height: 100%;
    max-width: unset;
    padding: 4rem 2rem;
  }
`;

export const FieldsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SignUpLink = styled(Link)`
  align-self: center;
  font-weight: bold;
  color: teal;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
