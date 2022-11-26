/*---------- External ----------*/
import React from "react";

/*---------- Components ----------*/
import ConversationHeader from "@/components/ConversationHeader";

/*---------- Styles ----------*/
import { ConversationContainer } from "./styles";

/*---------- Types ----------*/
import { ConversationScreenProps } from "./types";

const ConversationScreen: React.FC<ConversationScreenProps> = ({
  chatInfo,
  setSelectedChat = () => null,
}) => {
  /*---------- Handlers ----------*/
  const handleCloseChat = () => {
    setSelectedChat(undefined);
  };

  return (
    <ConversationContainer>
      <ConversationHeader closeChat={handleCloseChat} chatInfo={chatInfo} />
    </ConversationContainer>
  );
};

export default ConversationScreen;
