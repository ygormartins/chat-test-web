/*---------- External ----------*/
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";

/*---------- Components ----------*/
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

/*---------- Services ----------*/
import {
  LoginAuthResult,
  signIn,
  solveNewPasswordRequired,
} from "@/services/AuthService";

/*---------- Styles ----------*/
import { FieldsArea, FormContainer, SignUpLink } from "./styles";

const Login: React.FC = () => {
  /*---------- Hooks ----------*/
  const navigate = useNavigate();

  /*---------- Contexts ----------*/
  const { status, storeSession } = useContext(AuthContext);

  /*---------- States ----------*/
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoadingSignIn, setIsLoadingSignIn] = useState<boolean>(false);
  const [newPasswordStep, setIsNewPasswordStep] = useState<boolean>(false);
  const [signInResultState, setSignInResultState] = useState<LoginAuthResult>();
  const [isLoadingNewPassword, setIsLoadingNewPassword] =
    useState<boolean>(false);

  /*---------- Effects ----------*/
  useEffect(() => {
    if (!navigate) return;

    if (status === "AUTHENTICATED") {
      return navigate("/");
    }
  }, [status, navigate]);

  /*---------- Handlers ----------*/
  const showErrorAlert = (errorMessage: string) => {
    swal.fire({
      title: "Error!",
      text: errorMessage,
    });
  };

  const handleSignIn = async () => {
    setIsLoadingSignIn(true);

    try {
      const signInResult = await signIn(email, password);
      setSignInResultState(signInResult);

      if (signInResult.result === "CHANGE_PASSWORD") {
        setIsNewPasswordStep(true);
        return;
      }

      if (signInResult.userInfo && storeSession) {
        storeSession(signInResult.userInfo);
      }
    } catch (error) {
      const typedError = error as { message: string };

      showErrorAlert(typedError.message);
    }

    setIsLoadingSignIn(false);
  };

  const handleChangePassword = async () => {
    if (!signInResultState?.userObject) return;

    if (newPassword !== confirmPassword) {
      showErrorAlert("The passwords must match!");
      return;
    }

    setIsLoadingNewPassword(true);

    try {
      const userSession = await solveNewPasswordRequired(
        newPassword,
        signInResultState?.userObject
      );

      if (storeSession) storeSession(userSession.userInfo);
    } catch (error) {
      const typedError = error as { message: string };

      showErrorAlert(typedError.message);
    }

    setIsLoadingNewPassword(false);
  };

  /*---------- Renders ----------*/
  const renderSignInForm = () => (
    <>
      <h1>Login</h1>
      <FieldsArea>
        <TextInput
          type="email"
          label="Email address"
          value={email}
          onTextChange={setEmail}
          placeholder="Enter your email address"
        />
        <TextInput
          type="password"
          label="Password"
          value={password}
          onTextChange={setPassword}
          placeholder="Enter your password"
        />
      </FieldsArea>
      <Button loading={isLoadingSignIn} onClick={handleSignIn}>
        Sign in
      </Button>
      <SignUpLink to="/register">Create an account</SignUpLink>
    </>
  );

  const renderNewPasswordForm = () => (
    <>
      <h1>Choose your new password</h1>
      <FieldsArea>
        <TextInput
          type="password"
          label="New password"
          value={newPassword}
          onTextChange={setNewPassword}
          placeholder="Enter your new password"
        />
        <TextInput
          type="password"
          label="Confirm password"
          value={confirmPassword}
          onTextChange={setConfirmPassword}
          placeholder="Confirm your new password"
        />
      </FieldsArea>
      <Button loading={isLoadingNewPassword} onClick={handleChangePassword}>
        Set new password
      </Button>
    </>
  );

  return (
    <FormContainer>
      {!newPasswordStep ? renderSignInForm() : renderNewPasswordForm()}
    </FormContainer>
  );
};

export default Login;
