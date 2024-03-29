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
  submit = false,
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
        return "#327560";
    }
  }, [variant]);

  return (
    <ButtonContainer
      disabled={disabled}
      loadingState={loading}
      onClick={handleClick}
      variant={variant}
      type={submit ? "submit" : "button"}
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
