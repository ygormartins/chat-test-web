/*---------- External ----------*/
import styled from "styled-components";
import { Resizable } from "re-resizable";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1600px;
  box-shadow: 0 0 0.25rem 0.125rem #00000016;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  gap: 2.5rem;
  background-color: #eff5f5;

  @media screen and (max-width: 800px) {
    border-radius: 0;
    max-width: unset;
  }
`;

export const ChatsPanel = styled(Resizable).attrs({
  minWidth: "25%",
  maxWidth: "60%",
  enable: { right: true },
  defaultSize: { width: "35%", height: "100%" },
})`
  background-color: white;
  box-shadow: 0 0 0.25rem 0.125rem #00000016;
  overflow: hidden;
`;
