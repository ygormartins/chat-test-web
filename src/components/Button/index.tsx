/*---------- External ----------*/
import React from "react";

/*---------- Types ----------*/
import { ButtonProps } from "./types";

/*---------- Styles ----------*/
import { ButtonContainer } from "./styles";

const Button: React.FC<ButtonProps> = ({
  onClick = () => null,
  children = "",
}) => {
  return <ButtonContainer onClick={onClick}>{children}</ButtonContainer>;
};

export default Button;
