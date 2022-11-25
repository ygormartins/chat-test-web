/*---------- External ----------*/
import { IUser } from "@/@types/user";

export interface ProfilePictureProps {
  userInfo?: Omit<IUser, "email">;
  size?: number;
  round?: boolean;
  onClick?: (userInfo: IUser) => void;
}
