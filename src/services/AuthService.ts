/*---------- External ----------*/
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  ICognitoUserData,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

/*---------- Types ----------*/
type loginReturnResult = "SUCCESS" | "CHANGE_PASSWORD";

/*---------- Interfaces ----------*/
export interface UserAttributes {
  email: string;
  email_verified: string;
}

export interface LoginAuthResult {
  result: loginReturnResult;
  userObject: CognitoUser;
  userInfo?: CognitoUserSession;
}

export interface SolveNewPasswordResult {
  userInfo: CognitoUserSession;
}

/*---------- Clients ----------*/
const poolData = {
  UserPoolId: "us-east-1_M6msJ54SZ",
  ClientId: "6vieabn59r5oolqksvmav5j3ae",
};

const userPoolClient = new CognitoUserPool(poolData);

export const signIn = async (
  email: string,
  password: string
): Promise<LoginAuthResult> => {
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const userData: ICognitoUserData = {
    Pool: userPoolClient,
    Username: email,
  };

  const user = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (userInfo) => {
        resolve({
          userInfo,
          userObject: user,
          result: "SUCCESS",
        });
      },

      onFailure: (error) => {
        reject(error);
      },

      newPasswordRequired: () => {
        resolve({
          result: "CHANGE_PASSWORD",
          userObject: user,
        });
      },
    });
  });
};

export const solveNewPasswordRequired = async (
  newPassword: string,
  user: CognitoUser
): Promise<SolveNewPasswordResult> => {
  return new Promise((resolve, reject) => {
    user.completeNewPasswordChallenge(
      newPassword,
      {},
      {
        onSuccess: (userInfo: CognitoUserSession) => {
          resolve({
            userInfo,
          });
        },

        onFailure: (error) => reject(error),
      }
    );
  });
};
