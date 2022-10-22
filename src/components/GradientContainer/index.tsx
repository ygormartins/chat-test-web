/*---------- External ----------*/
import React from "react";
import { Container } from "./styles";

/*---------- Types ----------*/
import { GradientContainerProps } from "./types";

const GradientBackground: React.FC<GradientContainerProps> = ({
  children = null,
}) => {
  return <Container>{children}</Container>;
};

export default GradientBackground;
