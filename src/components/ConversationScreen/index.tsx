/*---------- External ----------*/
import React, { useState } from "react";

/*---------- Components ----------*/
import MessagesList from "@/components/MessagesList";
import ConversationHeader from "@/components/ConversationHeader";

/*---------- Styles ----------*/
import { ConversationContainer } from "./styles";

/*---------- Types ----------*/
import { ConversationScreenProps } from "./types";
import ChatInputBar from "../ChatInputBar";

const ConversationScreen: React.FC<ConversationScreenProps> = ({
  chatInfo,
  setSelectedChat = () => null,
}) => {
  /*---------- States ----------*/
  const [messageText, setMessageText] = useState<string>("");

  /*---------- Handlers ----------*/
  const handleCloseChat = () => {
    setSelectedChat(undefined);
  };

  return (
    <ConversationContainer>
      <ConversationHeader closeChat={handleCloseChat} chatInfo={chatInfo} />
      <MessagesList />
      <ChatInputBar messageText={messageText} setMessageText={setMessageText} />
    </ConversationContainer>
  );
};

export default ConversationScreen;
