/*---------- External ----------*/
import React, { useMemo } from "react";
import { format } from "date-fns";

/*---------- Styles ----------*/
import {
  ContentContainer,
  MessageBubble,
  MessageContainer,
  ProfilePictureContainer,
  TimeLabel,
} from "./styles";

/*---------- Types ----------*/
import { MessageItemProps } from "./types";
import ProfilePicture from "@/components/images/ProfilePicture";

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  groupMessage = false,
  sentByUser = true,
  displayProfilePicture = false,
}) => {
  /*---------- Memos ----------*/
  const formattedTime = useMemo(() => {
    const parsedTime = new Date(message.timestamp);

    return format(parsedTime, "hh:mm aaa");
  }, [message.timestamp]);

  return (
    <MessageContainer alignment={sentByUser ? "right" : "left"}>
      <ProfilePictureContainer>
        {displayProfilePicture ? (
          <ProfilePicture userInfo={message.user} size={38} />
        ) : null}
      </ProfilePictureContainer>
      <ContentContainer>
        <MessageBubble>{message.content}</MessageBubble>
        <TimeLabel>{formattedTime}</TimeLabel>
      </ContentContainer>
    </MessageContainer>
  );
};

export default MessageItem;
