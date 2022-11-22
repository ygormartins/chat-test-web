/*---------- External ----------*/
import React, { useMemo } from "react";

/*---------- External ----------*/
import Icon from "@/components/Icon";

/*---------- Styles ----------*/
import { ButtonContainer } from "./styles";

/*---------- Types ----------*/
import { IconButtonProps } from "./types";

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  tooltip,
  size = 32,
  bgColor = "transparent",
  fgColor = "black",
  onClick = () => false,
}) => {
  const iconSize = useMemo(() => size * 0.6, [size]);

  return (
    <ButtonContainer
      title={tooltip}
      onClick={onClick}
      background={bgColor}
      size={size}
    >
      <Icon size={iconSize} color={fgColor} icon={icon} />
    </ButtonContainer>
  );
};

export default IconButton;
