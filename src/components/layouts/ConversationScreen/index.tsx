/*---------- External ----------*/
import React, { useState } from "react";

/*---------- Components ----------*/
import MessagesList from "@/components/lists/MessagesList";
import ConversationHeader from "@/components/layouts/ConversationHeader";

/*---------- Styles ----------*/
import { ConversationContainer } from "./styles";

/*---------- Types ----------*/
import { ConversationScreenProps } from "./types";
import ChatInputBar from "../../inputs/ChatInputBar";

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
