/*---------- Types ----------*/
import { IUser } from "@/@types/user";

/*---------- Enums ----------*/
import { IconsEnum } from "@/constants/Icons";

export interface OptionItem {
  icon: IconsEnum;
  tooltip?: string;
  onClick?: () => void;
}

export interface ProfileHeaderProps {
  userInfo?: IUser;
  options?: OptionItem[];
}
