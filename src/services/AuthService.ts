/*---------- External ----------*/
import Axios from "axios";
import jwtDecode from "jwt-decode";

/*---------- Utils ----------*/
import { getCognitoError } from "@/utils/getCognitoError";
import { generateSecretHash } from "@/utils/generateSecretHash";

/*---------- Services ----------*/
import * as StorageService from "@/services/StorageService";

/*---------- Types ----------*/
import {
  IConfirmCodeAuthResult,
  IInitiateAuth,
  ILoginAuthResult,
  IRefreshToken,
  ISignUp,
  ISignUpAuthResult,
  IUser,
  IUserSignupAttributes,
} from "@/@types/auth";
import { isJwtExpired } from "jwt-check-expiration";

export const CognitoClient = Axios.create({
  baseURL: "https://cognito-idp.us-east-1.amazonaws.com",
  headers: {
    "Content-Type": "application/x-amz-json-1.1",
  },
});

export const signIn = async (
  email: string,
  password: string
): Promise<ILoginAuthResult> => {
  try {
    const { data: authResult } = await CognitoClient.post<IInitiateAuth>(
      "/",
      {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: "ib4d59vkkp5aki8fuv8n9dmm3",
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: generateSecretHash(email),
        },
      },
      {
        headers: {
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
        },
      }
    );

    const idTokenInfo = jwtDecode<IUser>(
      authResult.AuthenticationResult.IdToken
    );

    StorageService.setItem(
      "accessToken",
      authResult.AuthenticationResult.AccessToken
    );

    StorageService.setItem(
      "refreshToken",
      authResult.AuthenticationResult.RefreshToken
    );

    StorageService.setItem("idToken", authResult.AuthenticationResult.IdToken);

    return {
      result: "SUCCESS",

      accessToken: authResult.AuthenticationResult.AccessToken,
      idToken: authResult.AuthenticationResult.IdToken,
      refreshToken: authResult.AuthenticationResult.RefreshToken,

      userInfo: {
        email: idTokenInfo.email,
        name: idTokenInfo.name,
        sub: idTokenInfo.sub,
      },
    };
  } catch (error) {
    return getCognitoError<ILoginAuthResult>(error);
  }
};

export const refreshSession = async (
  username: string,
  refreshToken: string
): Promise<string | undefined> => {
  try {
    const { data: authResult } = await CognitoClient.post<IRefreshToken>(
      "/",
      {
        AuthFlow: "REFRESH_TOKEN_AUTH",
        ClientId: "ib4d59vkkp5aki8fuv8n9dmm3",
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
          SECRET_HASH: generateSecretHash(username),
        },
      },
      {
        headers: {
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
        },
      }
    );

    if (!authResult.AuthenticationResult.AccessToken) throw Error();

    StorageService.setItem(
      "accessToken",
      authResult.AuthenticationResult.AccessToken
    );

    StorageService.setItem("idToken", authResult.AuthenticationResult.IdToken);

    return authResult.AuthenticationResult.IdToken;
  } catch {
    StorageService.deleteItem("accessToken");
    StorageService.deleteItem("idToken");
    StorageService.deleteItem("refreshToken");
  }
};

export const getAccessToken = async (): Promise<string | undefined> => {
  let idToken = StorageService.getItem("idToken");

  if (!idToken) return undefined;

  const { email } = jwtDecode<IUser>(idToken);

  if (isJwtExpired(idToken)) {
    const refreshToken = StorageService.getItem("refreshToken");

    if (!refreshToken) return undefined;

    try {
      idToken = await refreshSession(email, refreshToken);
    } catch (_error) {
      return undefined;
    }
  }

  return idToken;
};

export const signUp = async (
  email: string,
  password: string,
  attributes: IUserSignupAttributes
): Promise<ISignUpAuthResult> => {
  const attributesList = Object.entries(attributes).map(
    ([attributeName, attributeValue]) => ({
      Name: attributeName,
      Value: attributeValue,
    })
  );

  try {
    const { data: authResult } = await CognitoClient.post<ISignUp>(
      "/",
      {
        Username: email,
        Password: password,
        ClientId: "ib4d59vkkp5aki8fuv8n9dmm3",
        SecretHash: generateSecretHash(email),
        UserAttributes: [
          ...attributesList,
          {
            Name: "email",
            Value: email,
          },
        ],
      },
      {
        headers: {
          "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp",
        },
      }
    );

    if (!authResult.UserConfirmed) {
      return {
        result: "CONFIRM_EMAIL",
      };
    }

    const { userInfo } = await signIn(email, password);

    return {
      result: "SUCCESS",
      userInfo,
    };
  } catch (error) {
    return getCognitoError<ISignUpAuthResult>(error);
  }
};

export const confirmEmail = async (
  code: string,
  email: string
): Promise<IConfirmCodeAuthResult> => {
  try {
    await CognitoClient.post(
      "/",
      {
        ConfirmationCode: code,
        Username: email,
        ClientId: "ib4d59vkkp5aki8fuv8n9dmm3",
        SecretHash: generateSecretHash(email),
      },
      {
        headers: {
          "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp",
        },
      }
    );

    return {
      result: "SUCCESS",
    };
  } catch (error) {
    return getCognitoError<IConfirmCodeAuthResult>(error);
  }
};

export const logout = async (): Promise<void> => {
  const accessToken = StorageService.getItem("accessToken");

  StorageService.deleteItem("accessToken");
  StorageService.deleteItem("idToken");
  StorageService.deleteItem("refreshToken");

  if (accessToken?.length) {
    try {
      await CognitoClient.post(
        "",
        {
          AccessToken: accessToken,
        },
        {
          headers: {
            "X-Amz-Target": "AWSCognitoIdentityProviderService.GlobalSignOut",
          },
        }
      );
    } catch (_error) {}
  }
};
