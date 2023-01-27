/*---------- External ----------*/
import React from "react";

/*---------- Styles ----------*/
import { ListContainer } from "./styles";

/*---------- Types ----------*/
import { MessagesListProps } from "./types";

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <ListContainer>
      {messages.map((message) => (
        <React.Fragment key={message.sortKey}>
          <p>
            +----------------------------------------------------------------------------------------------
          </p>
          <p>{`| Content: ${message.content}`}</p>
          <p>{`| User Name: ${message.user.name}`}</p>
          <p>{`| User ID: ${message.user.sub}`}</p>
          <p>{`| Timestamp: ${message.timestamp}`}</p>
          <p>{`| Message ID: ${message.sortKey}`}</p>
          <p>
            +----------------------------------------------------------------------------------------------
          </p>
        </React.Fragment>
      ))}
    </ListContainer>
  );
};

export default MessagesList;
