/*---------- External ----------*/
import React, { useContext, useState } from "react";

/*---------- Components ----------*/
import Button from "@/components/buttons/Button";
import TextInput from "@/components/inputs/TextInput";

/*---------- Contexts ----------*/
import { ModalContext } from "@/contexts/Modal";

/*---------- Styles ----------*/
import {
  ButtonsContainer,
  ModalContainer,
  ModalTitle,
  PreviewContainer,
} from "./styles";

const NewConversationModal: React.FC = () => {
  /*---------- States ----------*/
  const [emailInput, setEmailInput] = useState<string>("");
  const [loadingUser, setIsLoadingUser] = useState<boolean>(false);

  /*---------- Contexts ----------*/
  const { dismiss } = useContext(ModalContext);

  /*---------- Handlers ----------*/
  const handleOnDebounce = () => {
    setIsLoadingUser(true);
    setIsLoadingUser(false);
  };

  return (
    <ModalContainer>
      <ModalTitle>New Conversation</ModalTitle>
      <TextInput
        value={emailInput}
        label="User email"
        loading={loadingUser}
        placeholder="Enter the user's email address"
        onTextChange={setEmailInput}
        onDebounce={handleOnDebounce}
      />
      <PreviewContainer></PreviewContainer>
      <ButtonsContainer>
        <Button onClick={dismiss} variant="secondary">
          Cancel
        </Button>
        <Button disabled>Start chat</Button>
      </ButtonsContainer>
    </ModalContainer>
  );
};

export default NewConversationModal;
