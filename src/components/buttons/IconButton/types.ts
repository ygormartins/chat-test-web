/*---------- Constants ----------*/
import { IconsEnum } from "@/constants/Icons";

export interface IconButtonProps {
  icon: IconsEnum;
  size?: number;
  tooltip?: string;
  fgColor?: string;
  bgColor?: string;
  onClick?: () => void;
}
