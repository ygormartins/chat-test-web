/*---------- External ----------*/
import React from "react";
import { BottomText, Container } from "./styles";

/*---------- Types ----------*/
import { GradientContainerProps } from "./types";

const GradientBackground: React.FC<GradientContainerProps> = ({
  children = null,
}) => {
  return (
    <Container>
      {children}
      <BottomText>
        Made by <a href="https://github.com/ygormartins">@ygormartinsr</a> -
        Powered by AWS &#38; Coffee
      </BottomText>
    </Container>
  );
};

export default GradientBackground;
