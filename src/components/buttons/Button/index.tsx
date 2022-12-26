/*---------- External ----------*/
import React, { useMemo } from "react";
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
  variant = "primary",
}) => {
  /*---------- Handlers ----------*/
  const handleClick = () => {
    if (disabled) return;

    onClick();
  };

  const loadingColor = useMemo(() => {
    switch (variant) {
      case "primary":
      case "danger":
        return "white";
      case "secondary":
        return "teal";
    }
  }, [variant]);

  return (
    <ButtonContainer
      disabled={disabled}
      loadingState={loading}
      onClick={handleClick}
      variant={variant}
    >
      {children}
      {loading ? (
        <LoadingContainer>
          <ThreeDots color={loadingColor} height={32} width={32} />
        </LoadingContainer>
      ) : null}
    </ButtonContainer>
  );
};

export default Button;
