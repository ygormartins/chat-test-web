/*---------- External ----------*/
import { ReactNode } from "react";

/*---------- Types ----------*/
import {
  IUserSignupAttributes,
  ILoginAuthResult,
  ISignUpAuthResult,
} from "@/@types/auth";
import { IUser } from "@/@types/user";

export type AUTH_STATUS = "AUTHENTICATED" | "UNAUTHENTICATED" | "LOADING";

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface IAuthContext {
  status: AUTH_STATUS;
  user?: IUser;

  signIn?: (email: string, password: string) => Promise<ILoginAuthResult>;

  signUp?: (
    email: string,
    password: string,
    attributes: IUserSignupAttributes
  ) => Promise<ISignUpAuthResult>;

  confirmEmail?: (confirmationCode: string) => Promise<ILoginAuthResult>;

  signOut?: () => void;
}
