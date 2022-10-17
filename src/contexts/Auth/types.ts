/*---------- External ----------*/
import { ReactNode } from "react";

/*---------- Types ----------*/
import { CognitoUserSession } from "amazon-cognito-identity-js";

export type AUTH_STATUS = "AUTHENTICATED" | "UNAUTHENTICATED" | "LOADING";

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface IAuthContext {
  status: AUTH_STATUS;
  session?: CognitoUserSession;
  storeSession?: (cognitoSession: CognitoUserSession) => void;
}
