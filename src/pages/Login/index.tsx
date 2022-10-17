/*---------- External ----------*/
import React, { useState } from "react";
import swal from "sweetalert2";

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
import { Container, FieldsArea, FormContainer } from "./styles";

const Login: React.FC = () => {
  /*---------- States ----------*/
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newPasswordStep, setIsNewPasswordStep] = useState<boolean>(false);
  const [signInResultState, setSignInResultState] = useState<LoginAuthResult>();

  /*---------- Handlers ----------*/
  const showErrorAlert = (errorMessage: string) => {
    swal.fire({
      title: "Error!",
      text: errorMessage,
    });
  };

  const handleSignIn = async () => {
    try {
      const signInResult = await signIn(email, password);
      setSignInResultState(signInResult);

      if (signInResult.result === "CHANGE_PASSWORD") {
        setIsNewPasswordStep(true);
        return;
      }
    } catch (error) {
      const typedError = error as { message: string };

      showErrorAlert(typedError.message);
    }
  };

  const handleChangePassword = async () => {
    if (!signInResultState?.userObject) return;

    if (newPassword !== confirmPassword) {
      showErrorAlert("The passwords must match!");
      return;
    }

    try {
      const userSession = await solveNewPasswordRequired(
        newPassword,
        signInResultState?.userObject
      );

      // TODO: save state
    } catch (error) {
      const typedError = error as { message: string };

      showErrorAlert(typedError.message);
    }
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
      <Button onClick={handleSignIn}>Sign in</Button>
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
      <Button onClick={handleChangePassword}>Set new password</Button>
    </>
  );

  return (
    <Container>
      <FormContainer>
        {!newPasswordStep ? renderSignInForm() : renderNewPasswordForm()}
      </FormContainer>
    </Container>
  );
};

export default Login;
