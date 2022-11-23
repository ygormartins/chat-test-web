/*---------- External ----------*/
import { IUser } from "@/@types/user";

export interface ProfilePictureProps {
  userInfo?: IUser;
  size?: number;
  round?: boolean;
  onClick?: (userInfo: IUser) => void;
}
