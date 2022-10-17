/*---------- External ----------*/
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  ICognitoUserData,
  CognitoUserSession,
  CognitoUserAttribute,
  ISignUpResult,
} from "amazon-cognito-identity-js";

/*---------- Types ----------*/
type loginReturnResult = "SUCCESS" | "CHANGE_PASSWORD";

type signUpReturnResult = "SUCCESS" | "CONFIRM_EMAIL";

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

export interface SignUpAuthResult {
  result: signUpReturnResult;
  signUpResult?: ISignUpResult;
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

export const authenticateUser = async (
  user: CognitoUser,
  email: string,
  password: string
): Promise<LoginAuthResult> => {
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

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

export const signIn = async (
  email: string,
  password: string
): Promise<LoginAuthResult> => {
  const userData: ICognitoUserData = {
    Pool: userPoolClient,
    Username: email,
  };

  const user = new CognitoUser(userData);

  return authenticateUser(user, email, password);
};

export const signUp = async (
  name: string,
  email: string,
  password: string
): Promise<SignUpAuthResult> => {
  const emailAttribute = new CognitoUserAttribute({
    Name: "email",
    Value: email,
  });

  const nameAttribute = new CognitoUserAttribute({
    Name: "name",
    Value: name,
  });

  return new Promise((resolve, reject) => {
    userPoolClient.signUp(
      email,
      password,
      [emailAttribute, nameAttribute],
      [],
      (error, result) => {
        if (error) {
          reject(error);
        }

        if (!result?.userConfirmed) {
          resolve({
            result: "CONFIRM_EMAIL",
            signUpResult: result,
          });
        }

        resolve({
          result: "SUCCESS",
          signUpResult: result,
        });
      }
    );
  });
};

export const confirmEmail = async (code: string, user: CognitoUser) => {
  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
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
