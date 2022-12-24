/*---------- External ----------*/
import styled, { keyframes } from "styled-components";

/*---------- Animations ----------*/
const shimmerAnimation = keyframes`
   100% {
    background-position: left 0 top 0;
  }
`;

export const Container = styled.div`
  background-origin: padding-box;
  background-repeat: no-repeat;
  background-size: 400% 100%;
  background-position: right 0 top 0;

  animation: ${shimmerAnimation} 1.25s infinite ease-in-out;
  background-image: linear-gradient(
    90deg,
    #eaeaea,
    #eaeaea,
    #fafafa,
    #eaeaea,
    #eaeaea,
    #eaeaea
  );
`;
