/*---------- External ----------*/
import React from "react";

/*---------- Constants ----------*/
import Icons from "@/constants/Icons";

/*---------- Styles ----------*/
import { BaseIcon } from "./styles";

/*---------- Types ----------*/
import { IconProps } from "./types";

const Icon: React.FC<IconProps> = ({ icon, size = 32, color = "black" }) => {
  return <BaseIcon size={size} color={color} as={Icons[icon]} />;
};

export default Icon;
