/*---------- External ----------*/
import React from "react";

/*---------- Components ----------*/
import ProfilePicture from "@/components/images/ProfilePicture";
import IconButton from "@/components/buttons/IconButton";

/*---------- Styles ----------*/
import {
  Container,
  EmailLabel,
  InfoSection,
  NameLabel,
  OptionsSection,
} from "./styles";

/*---------- Types ----------*/
import { ProfileHeaderProps } from "./types";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userInfo }) => {
  return (
    <Container>
      <ProfilePicture size={38} userInfo={userInfo} />
      <InfoSection>
        <NameLabel>{userInfo?.name}</NameLabel>
        <EmailLabel>{userInfo?.email}</EmailLabel>
      </InfoSection>
      <OptionsSection>
        <IconButton
          tooltip="New Conversation"
          icon="add"
          fgColor="#0e454c"
          size={30}
        />
        <IconButton
          tooltip="Settings"
          icon="settings"
          fgColor="#0e454c"
          size={30}
        />
      </OptionsSection>
    </Container>
  );
};

export default ProfileHeader;
