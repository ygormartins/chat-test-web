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
import { FieldsArea, FormContainer, SignUpLink } from "./styles";

const Login: React.FC = () => {
  /*---------- Hooks ----------*/
  const navigate = useNavigate();

  /*---------- Contexts ----------*/
  const { status, signIn } = useContext(AuthContext);

  /*---------- States ----------*/
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoadingSignIn, setIsLoadingSignIn] = useState<boolean>(false);

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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignIn();
  };

  const handleSignIn = useCallback(async () => {
    if (!signIn) return;

    setIsLoadingSignIn(true);

    const signInStatus = await signIn(email, password);

    if (signInStatus.result !== "SUCCESS") {
      showErrorAlert(signInStatus?.errorMessage || "Unknown Error");
    }

    setIsLoadingSignIn(false);
  }, [signIn, email, password]);

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <h1>Login</h1>
      <FieldsArea>
        <TextInput
          type="email"
          label="Email address"
          value={email}
          autoFocus
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
      <Button submit loading={isLoadingSignIn}>
        Sign in
      </Button>
      <SignUpLink to="/register">Create an account</SignUpLink>
    </FormContainer>
  );
};

export default Login;
