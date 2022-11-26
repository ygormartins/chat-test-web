/*---------- External ----------*/
import React, { useState } from "react";

/*---------- Components ----------*/
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";

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
  onSendClick = () => null,
  setMessageText = () => null,
}) => {
  /*---------- Handlers ----------*/
  const [isButtonAnimating, setIsButtonAnimating] = useState<boolean>(false);

  /*---------- Handlers ----------*/
  const handleSendButtonClick = () => {
    onSendClick();

    setIsButtonAnimating(true);
    setMessageText("");
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
            value={messageText}
          />
        </MessageInputSection>
        <HorizontalSeparator />
        <ActionSection
          title="Send message"
          aria-disabled={!messageText?.length}
          disabled={!messageText?.length}
          animating={isButtonAnimating}
          onClick={handleSendButtonClick}
          onAnimationEnd={stopAnimation}
        >
          <Icon icon="paper-plane" color="#0e454c" size={20} />
        </ActionSection>
      </InternalContainer>
    </ExternalContainer>
  );
};

export default ChatInputBar;
