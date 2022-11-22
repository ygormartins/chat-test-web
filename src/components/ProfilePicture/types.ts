/*---------- External ----------*/
import { IUser } from "@/@types/auth";

export interface ProfilePictureProps {
  userInfo: IUser;
  size?: number;
  round?: boolean;
  onClick?: (userInfo: IUser) => void;
}
