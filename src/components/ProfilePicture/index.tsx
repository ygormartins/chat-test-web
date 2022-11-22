/*---------- External ----------*/
import React from "react";

/*---------- Styles ----------*/
import { Container } from "./styles";

/*---------- Types ----------*/
import { ProfilePictureProps } from "./types";

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  userInfo,
  onClick,
  size = 32,
  round = true,
}) => {
  return (
    <Container
      as={!!onClick ? "button" : "div"}
      clickable={!!onClick}
      round={round}
      size={size}
    ></Container>
  );
};

export default ProfilePicture;
