/*---------- External ----------*/
import React, { useContext, useMemo } from "react";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";

/*---------- Components ----------*/
import ProfilePicture from "@/components/images/ProfilePicture";

/*---------- Utils ----------*/
import { generateHumanReadableDate } from "@/utils/date/generateHumanReadableDate";

/*---------- Styles ----------*/
import {
  ContentLabel,
  InfoSection,
  InfoSectionBottomRow,
  InfoSectionTopRow,
  ItemContainer,
  MessageCountDot,
  MessageCountDotContainer,
  TimeLabel,
  TitleLabel,
} from "./styles";

/*---------- Types ----------*/
import { ChatsItemProps } from "./types";

const ChatItem: React.FC<ChatsItemProps> = ({
  chatInfo,
  onClick = () => null,
}) => {
  /*---------- Contexts ----------*/
  const { user } = useContext(AuthContext);

  /*---------- Memos ----------*/
  const contentLabel = useMemo(() => {
    if (!chatInfo.lastMessage) return "";

    const isUserSender = user?.sub === chatInfo.lastMessage.userSub;

    const senderPrefix = isUserSender
      ? "You: "
      : chatInfo.chatType === "group"
      ? `${chatInfo.lastMessage.userName}: `
      : "";

    const contentPreview =
      chatInfo.lastMessage.messageType === "image"
        ? "Image"
        : chatInfo.lastMessage.preview;

    return `${senderPrefix}${contentPreview}`;
  }, [chatInfo.lastMessage, chatInfo.chatType, user?.sub]);

  const lastEventDate = useMemo(() => {
    if (!chatInfo.lastMessage?.timestamp) return "";

    const date = new Date(chatInfo.lastMessage.timestamp);

    return generateHumanReadableDate(date);
  }, [chatInfo.lastMessage?.timestamp]);

  const messageCount = useMemo(() => {
    if (!chatInfo.unreadMessages) return;

    if (chatInfo.unreadMessages >= 10) return "+9";

    return chatInfo.unreadMessages;
  }, [chatInfo.unreadMessages]);

  /*---------- Handlers ----------*/
  const handleOnItemClick = () => {
    onClick(chatInfo);
  };

  /*---------- Renders ----------*/
  const renderPicture = () => {
    switch (chatInfo.chatType) {
      case "group":
        return <ProfilePicture size={38} userInfo={{ name: "", sub: "" }} />;
      case "private":
        const userSub = chatInfo.sortKey.replace("chat@user#", "");

        return (
          <ProfilePicture
            size={38}
            userInfo={{ name: chatInfo.title, sub: userSub }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ItemContainer role="listitem" onClick={handleOnItemClick}>
      {renderPicture()}
      <InfoSection>
        <InfoSectionTopRow>
          <TitleLabel>{chatInfo.title}</TitleLabel>
          <TimeLabel>{lastEventDate}</TimeLabel>
        </InfoSectionTopRow>
        <InfoSectionBottomRow>
          <ContentLabel bold={!!messageCount}>{contentLabel}</ContentLabel>
          <MessageCountDotContainer>
            {messageCount ? (
              <MessageCountDot>{messageCount}</MessageCountDot>
            ) : null}
          </MessageCountDotContainer>
        </InfoSectionBottomRow>
      </InfoSection>
    </ItemContainer>
  );
};

export default ChatItem;
