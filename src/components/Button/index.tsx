/*---------- External ----------*/
import React from "react";
import { ThreeDots } from "react-loader-spinner";

/*---------- Types ----------*/
import { ButtonProps } from "./types";

/*---------- Styles ----------*/
import { ButtonContainer, LoadingContainer } from "./styles";

const Button: React.FC<ButtonProps> = ({
  onClick = () => null,
  children = "",
  loading = false,
  disabled = false,
}) => {
  /*---------- Handlers ----------*/
  const handleClick = () => {
    if (disabled) return;

    onClick();
  };

  return (
    <ButtonContainer
      disabled={disabled}
      loading={loading}
      onClick={handleClick}
    >
      {children}
      {loading ? (
        <LoadingContainer>
          <ThreeDots color="white" height={32} width={32} />
        </LoadingContainer>
      ) : null}
    </ButtonContainer>
  );
};

export default Button;
