/*---------- External ----------*/
import styled from "styled-components";

/*---------- Types ----------*/
import { IBaseIcon } from "./types";

export const BaseIcon = styled.div.attrs<IBaseIcon>(({ color }) => ({
  fill: color,
}))<IBaseIcon>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`;
