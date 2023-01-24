/*---------- External ----------*/
import React, { useState } from "react";

/*---------- Components ----------*/
import Icon from "@/components/images/Icon";
import IconButton from "@/components/buttons/IconButton";

/*---------- Styles ----------*/
import {
  ActionSection,
  AttachmentsSection,
  ExternalContainer,
  HorizontalSeparator,
  InternalContainer,
  MessageInputSection,
  TextInput,
} from "./styles";

/*---------- Types ----------*/
import { ChatInputBarProps } from "./types";

const ChatInputBar: React.FC<ChatInputBarProps> = ({
  messageText = "",
  onSendMessage = () => null,
  setMessageText = () => null,
}) => {
  /*---------- Handlers ----------*/
  const [isButtonAnimating, setIsButtonAnimating] = useState<boolean>(false);

  /*---------- Handlers ----------*/
  const handleSendMessage = () => {
    if (!messageText.trim().length) return;

    onSendMessage(messageText);
    setIsButtonAnimating(true);
    setMessageText("");
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleMessageEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const stopAnimation = () => {
    setIsButtonAnimating(false);
  };

  return (
    <ExternalContainer>
      <InternalContainer>
        <AttachmentsSection>
          <IconButton
            fgColor="#8a8a8a"
            tooltip="Emojis"
            icon="smile"
            size={32}
          />
          <IconButton
            fgColor="#8a8a8a"
            tooltip="Add image"
            icon="camera"
            size={32}
          />
        </AttachmentsSection>
        <HorizontalSeparator />
        <MessageInputSection>
          <TextInput
            placeholder="Write a message"
            onChange={handleMessageEdit}
            onKeyDown={handleOnKeyDown}
            value={messageText}
            autoFocus
          />
        </MessageInputSection>
        <HorizontalSeparator />
        <ActionSection
          title="Send message"
          aria-disabled={!messageText?.trim().length}
          disabled={!messageText?.trim().length}
          animating={isButtonAnimating}
          onClick={handleSendMessage}
          onAnimationEnd={stopAnimation}
        >
          <Icon icon="paper-plane" color="#0e454c" size={20} />
        </ActionSection>
      </InternalContainer>
    </ExternalContainer>
  );
};

export default ChatInputBar;
