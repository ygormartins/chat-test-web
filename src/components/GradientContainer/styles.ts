/*---------- External ----------*/
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background: teal;
  background: linear-gradient(45deg, teal 0%, aquamarine 100%);
`;

export const BottomText = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
  font-weight: bold;
  color: #eee;
  text-shadow: 0 0 0.25rem #00000024;

  & > * {
    color: white;
  }
`;
