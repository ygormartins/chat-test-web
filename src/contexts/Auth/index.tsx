/*---------- External ----------*/
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

/*---------- Services ----------*/
import * as AuthService from "@/services/AuthService";
import * as StorageService from "@/services/StorageService";

/*---------- Types ----------*/
import {
  ILoginAuthResult,
  ISignUpAuthResult,
  IUser,
  IUserSignupAttributes,
} from "@/@types/auth";
import { AuthProviderProps, AUTH_STATUS, IAuthContext } from "./@types";

export const AuthContext = React.createContext<IAuthContext>({
  status: "LOADING",
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  /*---------- Public States ----------*/
  const [user, setUser] = useState<IUser>();
  const [status, setStatus] = useState<AUTH_STATUS>("LOADING");

  /*---------- Private States ----------*/
  const [tempEmail, setTempEmail] = useState<string>();
  const [tempPassword, setTempPassword] = useState<string>();

  /*---------- Handlers ----------*/
  const signIn = async (
    email: string,
    password: string
  ): Promise<ILoginAuthResult> => {
    const signInResult = await AuthService.signIn(email, password);

    switch (signInResult.result) {
      case "SUCCESS":
        setUser(signInResult.userInfo);
        setStatus("AUTHENTICATED");
        break;

      default:
        signOut();
        setUser(undefined);
        setStatus("UNAUTHENTICATED");
    }

    return signInResult;
  };

  const signUp = async (
    email: string,
    password: string,
    attributes: IUserSignupAttributes
  ): Promise<ISignUpAuthResult> => {
    const signUpResult = await AuthService.signUp(email, password, attributes);

    if (signUpResult.result === "SUCCESS") {
      setUser(signUpResult.userInfo);
      setStatus("AUTHENTICATED");
    } else {
      setStatus("UNAUTHENTICATED");
    }

    switch (signUpResult.result) {
      case "SUCCESS":
        setUser(signUpResult.userInfo);
        setStatus("AUTHENTICATED");
        break;

      case "CONFIRM_EMAIL":
        setTempEmail(email);
        setTempPassword(password);
        setStatus("UNAUTHENTICATED");
        break;

      default:
        setStatus("UNAUTHENTICATED");
    }

    return signUpResult;
  };

  const confirmEmail = async (
    confirmationCode: string
  ): Promise<ILoginAuthResult> => {
    if (!tempEmail || !tempPassword) {
      setTempEmail(undefined);
      setTempPassword(undefined);

      return {
        result: "ERROR",
        errorMessage: "Couldn't find session data",
      };
    }

    const confirmationResult = await AuthService.confirmEmail(
      confirmationCode,
      tempEmail
    );

    switch (confirmationResult.result) {
      case "SUCCESS":
        return signIn(tempEmail, tempPassword);
      default:
        return {
          result: "ERROR",
          errorMessage: confirmationResult.errorMessage,
        };
    }
  };

  const signOut = () => {
    AuthService.logout();

    setUser(undefined);
    setStatus("UNAUTHENTICATED");
  };

  /*---------- Effects ----------*/
  useEffect(() => {
    const storedAccessToken = StorageService.getItem("accessToken");
    const storedRefreshToken = StorageService.getItem("refreshToken");
    const storedIdToken = StorageService.getItem("idToken");

    if (!storedAccessToken || !storedRefreshToken || !storedIdToken) {
      signOut();
      return;
    }

    const userInfo = jwtDecode<IUser>(storedIdToken);

    setUser(userInfo);
    setStatus("AUTHENTICATED");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, status, signIn, signUp, confirmEmail, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
