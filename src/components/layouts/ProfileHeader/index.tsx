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
import { OptionItem, ProfileHeaderProps } from "./types";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userInfo,
  options = [],
}) => {
  /*---------- Renders ----------*/
  const renderOptionItem = (item: OptionItem, index: number) => (
    <IconButton
      tooltip={item.tooltip}
      icon={item.icon}
      onClick={item.onClick}
      fgColor="#0e454c"
      size={30}
      key={`option-${index}`}
    />
  );

  return (
    <Container>
      <ProfilePicture size={38} userInfo={userInfo} />
      <InfoSection>
        <NameLabel>{userInfo?.name}</NameLabel>
        <EmailLabel>{userInfo?.email}</EmailLabel>
      </InfoSection>
      <OptionsSection>{options.map(renderOptionItem)}</OptionsSection>
    </Container>
  );
};

export default ProfileHeader;
