/*---------- External ----------*/
import React, { useState } from "react";
import swal from "sweetalert2";

/*---------- Components ----------*/
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

/*---------- Services ----------*/
import {
  signUp,
  authenticateUser,
  confirmEmail,
  SignUpAuthResult,
} from "@/services/AuthService";

/*---------- Styles ----------*/
import { Container, FieldsArea, FormContainer } from "./styles";

const SignUp: React.FC = () => {
  /*---------- States ----------*/
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmCodeStep, setConfirmCodeStep] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [signUpResultState, setSignUpResultState] =
    useState<SignUpAuthResult>();

  /*---------- Handlers ----------*/
  const showErrorAlert = (errorMessage: string) => {
    swal.fire({
      title: "Error!",
      text: errorMessage,
    });
  };

  const handleSignUp = async () => {
    if (newPassword !== confirmPassword) {
      showErrorAlert("The passwords must match!");
      return;
    }

    try {
      const signUpResult = await signUp(name, email, newPassword);
      setSignUpResultState(signUpResult);

      if (signUpResult.result === "CONFIRM_EMAIL") {
        setConfirmCodeStep(true);
        return;
      }

      await registerSession();
    } catch (error) {
      const typedError = error as { message: string };

      showErrorAlert(typedError.message);
    }
  };

  const handleConfirmEmail = async () => {
    if (!signUpResultState?.signUpResult?.user) return;

    try {
      await confirmEmail(
        confirmationCode,
        signUpResultState?.signUpResult.user
      );

      await registerSession();
    } catch (error) {
      const typedError = error as { message: string };

      showErrorAlert(typedError.message);
    }
  };

  const registerSession = async () => {
    if (!signUpResultState?.signUpResult?.user) return;

    try {
      const authResult = await authenticateUser(
        signUpResultState?.signUpResult?.user,
        email,
        newPassword
      );

      // TODO: save state
    } catch (error) {
      const typedError = error as { message: string };
      showErrorAlert(typedError.message);
    }
  };

  /*---------- Renders ----------*/
  const renderSignUpForm = () => (
    <>
      <h1>Create a new account</h1>
      <FieldsArea>
        <TextInput
          value={name}
          onTextChange={setName}
          type="text"
          label="Full name"
          placeholder="Enter your name"
        />
        <TextInput
          value={email}
          onTextChange={setEmail}
          type="email"
          label="Email address"
          placeholder="Enter your email address"
        />
        <TextInput
          value={newPassword}
          onTextChange={setNewPassword}
          type="password"
          label="New password"
          placeholder="Enter your new password"
        />
        <TextInput
          value={confirmPassword}
          onTextChange={setConfirmPassword}
          type="password"
          label="Confirm password"
          placeholder="Confirm your new password"
        />
      </FieldsArea>
      <Button onClick={handleSignUp}>Sign up</Button>
    </>
  );

  const renderConfirmCodeForm = () => (
    <>
      <h1>Confirm your email</h1>
      <FieldsArea>
        <TextInput
          value={confirmationCode}
          onTextChange={setConfirmationCode}
          type="text"
          label="Confirmation code"
          placeholder="Enter the confirmation code you've received in your inbox"
        />
      </FieldsArea>
      <Button onClick={handleConfirmEmail}>Confirm</Button>
    </>
  );

  return (
    <Container>
      <FormContainer>
        {!confirmCodeStep ? renderSignUpForm() : renderConfirmCodeForm()}
      </FormContainer>
    </Container>
  );
};

export default SignUp;
