/*---------- External ----------*/
import { CognitoUserSession } from "amazon-cognito-identity-js";
import React, { useEffect, useState } from "react";

/*---------- Types ----------*/
import { AuthProviderProps, AUTH_STATUS, IAuthContext } from "./types";

export const AuthContext = React.createContext<IAuthContext>({
  status: "LOADING",
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  /*---------- States ----------*/
  const [session, setSession] = useState<CognitoUserSession>();
  const [status, setStatus] = useState<AUTH_STATUS>("LOADING");

  /*---------- Handlers ----------*/
  const storeSession = (cognitoSession: CognitoUserSession) => {
    localStorage.setItem("CHAT-APP:session", JSON.stringify(cognitoSession));

    setSession(cognitoSession);
    setStatus("AUTHENTICATED");
  };

  /*---------- Effects ----------*/
  useEffect(() => {
    const storedSession = localStorage.getItem("CHAT-APP:session");

    if (!storedSession) {
      setStatus("UNAUTHENTICATED");
      return;
    }

    setSession(JSON.parse(storedSession));
    setStatus("AUTHENTICATED");
  }, []);

  return (
    <AuthContext.Provider value={{ session, status, storeSession }}>
      {children}
    </AuthContext.Provider>
  );
};
