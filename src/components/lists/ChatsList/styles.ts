/*---------- External ----------*/
import styled from "styled-components";

export const ListContainer = styled.ul`
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
