/*---------- External ----------*/
import React from "react";

/*---------- Components ----------*/
import ChatItem from "@/components/layouts/ChatItem";

/*---------- Styles ----------*/
import { ListContainer } from "./styles";

/*---------- Types ----------*/
import { ChatsListProps } from "./types";

const ChatsList: React.FC<ChatsListProps> = ({
  chatsList,
  onChatItemClick = () => null,
}) => {
  /*---------- Renders ----------*/
  const renderChatsList = () =>
    chatsList.map((chat) => (
      <ChatItem onClick={onChatItemClick} key={chat.sortKey} chatInfo={chat} />
    ));

  return <ListContainer>{renderChatsList()}</ListContainer>;
};

export default ChatsList;
