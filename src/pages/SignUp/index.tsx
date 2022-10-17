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
  signUp,
  authenticateUser,
  confirmEmail,
  SignUpAuthResult,
} from "@/services/AuthService";

/*---------- Styles ----------*/
import { FieldsArea, FormContainer, SignInLink } from "./styles";

const SignUp: React.FC = () => {
  /*---------- Hooks ----------*/
  const navigate = useNavigate();

  /*---------- Contexts ----------*/
  const { status, storeSession } = useContext(AuthContext);

  /*---------- States ----------*/
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [confirmCodeStep, setConfirmCodeStep] = useState<boolean>(false);
  const [isLoadingSignup, setIsLoadingSignup] = useState<boolean>(false);
  const [isLoadingConfirmation, setIsLoadingConfirmation] =
    useState<boolean>(false);
  const [signUpResultState, setSignUpResultState] =
    useState<SignUpAuthResult>();

  /*---------- Effects ----------*/
  useEffect(() => {
    if (!navigate) return;

    if (status === "AUTHENTICATED") {
      navigate("/");
    }
  }, [status, navigate]);

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

    setIsLoadingSignup(true);

    try {
      const signUpResult = await signUp(name, email, newPassword);
      setSignUpResultState(signUpResult);

      if (signUpResult.result === "CONFIRM_EMAIL") {
        setIsLoadingSignup(false);
        setConfirmCodeStep(true);

        return;
      }

      await registerSession();
    } catch (error) {
      const typedError = error as { message: string };

      showErrorAlert(typedError.message);
    }

    setIsLoadingSignup(false);
  };

  const handleConfirmEmail = async () => {
    if (!signUpResultState?.signUpResult?.user) return;

    setIsLoadingConfirmation(true);

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

    setIsLoadingConfirmation(false);
  };

  const registerSession = async () => {
    if (!signUpResultState?.signUpResult?.user) return;

    try {
      const authResult = await authenticateUser(
        signUpResultState?.signUpResult?.user,
        email,
        newPassword
      );

      if (authResult.userInfo && storeSession) {
        storeSession(authResult.userInfo);
      }
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
      <Button loading={isLoadingSignup} onClick={handleSignUp}>
        Sign up
      </Button>
      <SignInLink to="/login">I already have an account</SignInLink>
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
      <Button loading={isLoadingConfirmation} onClick={handleConfirmEmail}>
        Confirm
      </Button>
    </>
  );

  return (
    <FormContainer>
      {!confirmCodeStep ? renderSignUpForm() : renderConfirmCodeForm()}
    </FormContainer>
  );
};

export default SignUp;
