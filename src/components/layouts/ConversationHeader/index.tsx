/*---------- External ----------*/
import React, { useMemo } from "react";

/*---------- Components ----------*/
import IconButton from "@/components/buttons/IconButton";
import ProfilePicture from "@/components/images/ProfilePicture";

/*---------- Styles ----------*/
import {
  Container,
  TitleLabel,
  InfoSection,
  SubtitleLabel,
  OptionsSection,
} from "./styles";

/*---------- Types ----------*/
import { IUser } from "@/@types/user";
import { ConversationHeaderProps } from "./types";

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  chatInfo,
  closeChat = () => null,
}) => {
  /*---------- Memos ----------*/
  const chatSubtitle = useMemo(() => {
    if (!chatInfo?.chatType) return "";

    return chatInfo?.chatType === "group"
      ? "Group Chat"
      : "Private Conversation";
  }, [chatInfo?.chatType]);

  const userInfo: Omit<IUser, "email"> | undefined = useMemo(() => {
    if (!chatInfo?.sortKey || !chatInfo?.title) return undefined;

    const userSub = chatInfo.sortKey.split("#")[1];

    return {
      name: chatInfo.title,
      sub: userSub,
    };
  }, [chatInfo?.sortKey, chatInfo?.title]);

  return (
    <Container>
      <ProfilePicture size={38} userInfo={userInfo} />
      <InfoSection>
        <TitleLabel>{chatInfo?.title}</TitleLabel>
        <SubtitleLabel>{chatSubtitle}</SubtitleLabel>
      </InfoSection>
      <OptionsSection>
        <IconButton
          onClick={closeChat}
          tooltip="Close chat"
          icon="close"
          fgColor="#0e454c"
          size={30}
        />
      </OptionsSection>
    </Container>
  );
};

export default ConversationHeader;
