/*---------- External ----------*/
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";

/*---------- Components ----------*/
import Button from "@/components/buttons/Button";
import TextInput from "@/components/inputs/TextInput";

/*---------- Styles ----------*/
import { FieldsArea, FormContainer, SignInLink } from "./styles";

const SignUp: React.FC = () => {
  /*---------- Hooks ----------*/
  const navigate = useNavigate();

  /*---------- Contexts ----------*/
  const { status, signUp, confirmEmail } = useContext(AuthContext);

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

  const handleSignUp = useCallback(async () => {
    if (!signUp) return;

    if (newPassword !== confirmPassword) {
      showErrorAlert("The passwords must match!");
      return;
    }

    setIsLoadingSignup(true);

    const signUpStatus = await signUp(email, newPassword, { name });

    switch (signUpStatus?.result) {
      case "CONFIRM_EMAIL":
        setConfirmCodeStep(true);
        break;
      case "ERROR":
        showErrorAlert(signUpStatus?.errorMessage || "Unknown Error");
        break;
    }

    setIsLoadingSignup(false);
  }, [
    signUp,
    email,
    newPassword,
    name,
    setIsLoadingSignup,
    setConfirmCodeStep,
    confirmPassword,
  ]);

  const handleConfirmEmail = useCallback(async () => {
    if (!confirmEmail) return;

    setIsLoadingConfirmation(true);

    const confirmationStatus = await confirmEmail(confirmationCode);

    switch (confirmationStatus?.result) {
      case "ERROR":
        showErrorAlert(confirmationStatus?.errorMessage || "Unknown Error");
        break;
    }

    setIsLoadingConfirmation(false);
  }, [confirmEmail, confirmationCode]);

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
