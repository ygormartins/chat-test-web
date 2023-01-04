/*---------- Types ----------*/
import { IUser } from "@/@types/user";

export type LoginReturnResult = "SUCCESS" | "ERROR";

export type SignUpReturnResult = "SUCCESS" | "CONFIRM_EMAIL" | "ERROR";

export type ConfirmCodeResult = "SUCCESS" | "ERROR";

/*---------- Interfaces ----------*/
export interface IUserSignupAttributes {
  name: string;
}

export interface IAuthResultPayload {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  RefreshToken: string;
}

export interface IInitiateAuth {
  AuthenticationResult: IAuthResultPayload;
  ChallengeName?: string;
}

export interface IRefreshToken {
  AuthenticationResult: Omit<IAuthResultPayload, "RefreshToken">;
}

export interface ISignUp {
  CodeDeliveryDetails: {
    AttributeName: string;
    DeliveryMedium: "EMAIL" | "SMS";
    Destination: string;
  };
  UserConfirmed: boolean;
  UserSub: string;
}

export interface ILoginAuthResult {
  result: LoginReturnResult;
  userInfo?: IUser;
  idToken?: string;
  accessToken?: string;
  refreshToken?: string;
  errorMessage?: string;
}

export interface ISignUpAuthResult {
  result: SignUpReturnResult;
  userInfo?: IUser;
  errorMessage?: string;
}

export interface IConfirmCodeAuthResult {
  result: ConfirmCodeResult;
  errorMessage?: string;
}
