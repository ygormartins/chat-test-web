/*---------- External ----------*/
import React, { useMemo } from "react";

/*---------- Components ----------*/
import IconButton from "@/components/IconButton";
import ProfilePicture from "@/components/ProfilePicture";

/*---------- Styles ----------*/
import {
  Container,
  TitleLabel,
  InfoSection,
  SubtitleLabel,
  OptionsSection,
} from "./styles";

/*---------- Types ----------*/
import { ConversationHeaderProps } from "./types";

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  chatInfo,
  closeChat = () => null,
}) => {
  /*---------- Memos ----------*/
  const chatSubtitle = useMemo(() => {
    if (!chatInfo?.type) return "";

    return chatInfo?.type === "group" ? "Group Chat" : "Private Conversation";
  }, [chatInfo?.type]);
  return (
    <Container>
      <ProfilePicture size={38} userInfo={{ name: "", sub: "" }} />
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
