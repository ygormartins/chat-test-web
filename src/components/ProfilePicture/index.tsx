/*---------- External ----------*/
import React, { useMemo, useState } from "react";

/*---------- Components ----------*/
import Icon from "@/components/Icon";

/*---------- Styles ----------*/
import { Container, Image, LoadingPlaceholder } from "./styles";

/*---------- Types ----------*/
import { ProfilePictureProps } from "./types";

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  userInfo,
  onClick,
  size = 32,
  round = true,
}) => {
  /*---------- States ----------*/
  const [loadingImage, setIsLoadingImage] = useState<boolean>(true);
  const [errorLoading, setErrorLoading] = useState<boolean>(false);

  /*---------- Memos ----------*/
  const imageUrl = useMemo(() => {
    setIsLoadingImage(true);

    return `${import.meta.env.VITE_PUBLIC_MEDIA_URL}/user/${userInfo?.sub}.png`;
  }, [userInfo?.sub]);

  /*---------- Handlers ----------*/
  const handleFetchFailed = () => {
    setErrorLoading(true);
    setIsLoadingImage(false);
  };

  const handleFetchSucceeded = () => {
    setErrorLoading(false);
    setIsLoadingImage(false);
  };

  /*---------- Renders ----------*/
  const renderLoadingIndicator = () => {
    return <LoadingPlaceholder />;
  };

  const renderProfilePicture = () => {
    if (errorLoading)
      return <Icon icon="person-silhouette" color="#8f8f8f" size={size} />;

    return (
      <Image
        src={imageUrl}
        alt={userInfo?.name}
        onLoad={handleFetchSucceeded}
        onError={handleFetchFailed}
        aria-busy={loadingImage}
      />
    );
  };

  return (
    <Container
      as={!!onClick ? "button" : "div"}
      clickable={!!onClick}
      round={round}
      size={size}
    >
      {renderProfilePicture()}
      {loadingImage ? renderLoadingIndicator() : null}
    </Container>
  );
};

export default ProfilePicture;
