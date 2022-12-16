/*---------- External ----------*/
import React, { useMemo, useState } from "react";

/*---------- Components ----------*/
import Icon from "@/components/Icon";

/*---------- Styles ----------*/
import { Container, Image } from "./styles";

/*---------- Types ----------*/
import { ProfilePictureProps } from "./types";

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  userInfo,
  onClick,
  size = 32,
  round = true,
}) => {
  /*---------- Styles ----------*/
  const [loadingImage, setIsLoadingImage] = useState<boolean>(true);
  const [error, setIsError] = useState<boolean>(false);

  const imageUrl = useMemo(() => {
    setIsLoadingImage(true);

    return `https://chat-app-public-media.s3.amazonaws.com/user/${userInfo?.sub}.png`;
  }, [userInfo?.sub]);

  return (
    <Container
      as={!!onClick ? "button" : "div"}
      clickable={!!onClick}
      round={round}
      size={size}
    >
      {!error ? (
        <Image
          src={imageUrl}
          alt={userInfo?.name}
          onLoad={() => setIsError(false)}
          onError={() => setIsError(true)}
        />
      ) : (
        <Icon icon="person-silhouette" color="#8f8f8f" size={size} />
      )}
    </Container>
  );
};

export default ProfilePicture;
