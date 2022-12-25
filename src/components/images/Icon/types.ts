/*---------- Constants ----------*/
import { IconsEnum } from "@/constants/Icons";

export interface IconProps {
  icon: IconsEnum;
  size?: number;
  color?: string;
}

export interface IBaseIcon {
  size: number;
  color: string;
}
