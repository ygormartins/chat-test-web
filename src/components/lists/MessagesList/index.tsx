/*---------- External ----------*/
import React from "react";

/*---------- Messages ----------*/
import MessageItem from "@/components/layouts/MessageItem";

/*---------- Styles ----------*/
import { ListContainer } from "./styles";

/*---------- Types ----------*/
import { MessagesListProps } from "./types";

const MessagesList: React.FC<MessagesListProps> = ({ messages, user }) => {
  /*---------- Renders ----------*/
  const renderMessages = () =>
    messages.map((message, index, array) => {
      const isNextMessageFromSameUser =
        message.user.sub === array[index + 1]?.user.sub;

      return (
        <MessageItem
          message={message}
          sentByUser={user?.sub === message.user.sub}
          displayProfilePicture={!isNextMessageFromSameUser}
          key={message.sortKey}
        />
      );
    });

  return <ListContainer>{renderMessages()}</ListContainer>;
};

export default MessagesList;
