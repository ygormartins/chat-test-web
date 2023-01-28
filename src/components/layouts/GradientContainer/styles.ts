/*---------- External ----------*/
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: #327560;
  background: linear-gradient(45deg, #327560 0%, aquamarine 100%);

  @media screen and (max-width: 800px) {
    padding: 0;
  }
`;
