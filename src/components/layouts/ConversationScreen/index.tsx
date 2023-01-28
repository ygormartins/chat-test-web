/*---------- External ----------*/
import React, { useMemo, useState } from "react";

/*---------- Components ----------*/
import MessagesList from "@/components/lists/MessagesList";
import ConversationHeader from "@/components/layouts/ConversationHeader";

/*---------- Styles ----------*/
import { ConversationContainer } from "./styles";

/*---------- Types ----------*/
import { ConversationScreenProps } from "./types";
import ChatInputBar from "../../inputs/ChatInputBar";
import { IChat } from "@/@types/chat";

const ConversationScreen: React.FC<ConversationScreenProps> = ({
  user,
  chatInfo,
  chatUserInfo,
  chatMessagesList = [],
  sendMessage = () => null,
  setSelectedChat = () => null,
}) => {
  /*---------- Memos ----------*/
  const updatedUserInfo: IChat = useMemo(() => {
    return {
      ...chatInfo,
      title: chatUserInfo?.name || chatInfo?.title,
    } as IChat;
  }, [chatInfo, chatUserInfo]);

  /*---------- States ----------*/
  const [messageText, setMessageText] = useState<string>("");

  /*---------- Handlers ----------*/
  const handleCloseChat = () => {
    setSelectedChat(undefined);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      handleCloseChat();
    }
  };

  return (
    <ConversationContainer onKeyDown={handleOnKeyDown}>
      <ConversationHeader
        closeChat={handleCloseChat}
        chatInfo={updatedUserInfo}
      />
      <MessagesList user={user} messages={chatMessagesList} />
      <ChatInputBar
        onSendMessage={sendMessage}
        messageText={messageText}
        setMessageText={setMessageText}
      />
    </ConversationContainer>
  );
};

export default ConversationScreen;
