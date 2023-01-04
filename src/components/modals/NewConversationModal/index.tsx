/*---------- External ----------*/
import React, { useCallback, useContext, useMemo, useState } from "react";

/*---------- Components ----------*/
import Button from "@/components/buttons/Button";
import TextInput from "@/components/inputs/TextInput";
import ProfilePicture from "@/components/images/ProfilePicture";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";
import { ModalContext } from "@/contexts/Modal";
import { ChatsContext } from "@/contexts/Chats";

/*---------- Services ----------*/
import { getUserInfo } from "@/services/UsersService";

/*---------- Types ----------*/
import { IUser } from "@/@types/user";
import { IChat } from "@/@types/chat";

/*---------- Styles ----------*/
import {
  ButtonsContainer,
  ModalContainer,
  ModalTitle,
  PreviewContainer,
  UserEmailSubtitle,
  UserInfoCard,
  UserInfoSection,
  UserNameTitle,
  UserNotFoundLabel,
} from "./styles";

const NewConversationModal: React.FC = () => {
  /*---------- States ----------*/
  const [emailInput, setEmailInput] = useState<string>("");
  const [userInfo, setUserInfo] = useState<IUser | undefined>();
  const [loadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [userNotFoundInCurrentSearch, setUserNotFoundInCurrentSearch] =
    useState<boolean>(false);

  /*---------- Contexts ----------*/
  const { user: currentUser } = useContext(AuthContext);
  const { dismiss } = useContext(ModalContext);
  const { setSelectedChat } = useContext(ChatsContext);

  /*---------- Memos ----------*/
  const canStartChat = useMemo(
    () => userInfo && userInfo.sub !== currentUser?.sub,
    [userInfo, currentUser?.sub]
  );

  /*---------- Handlers ----------*/
  const fetchUserInfo = useCallback(async () => {
    if (!emailInput) {
      setUserNotFoundInCurrentSearch(false);
      return undefined;
    }

    try {
      const result = await getUserInfo({ email: emailInput });
      setUserNotFoundInCurrentSearch(false);
      return result;
    } catch (_error) {
      setUserNotFoundInCurrentSearch(true);
      return undefined;
    }
  }, [emailInput]);

  const handleOnTextChange = (newText: string) => {
    setEmailInput(newText);
  };

  const handleOnDebounce = useCallback(async () => {
    setIsLoadingUser(true);

    const newUserInfo = await fetchUserInfo();
    setUserInfo(newUserInfo);

    setIsLoadingUser(false);
  }, [fetchUserInfo]);

  const handleStartChat = useCallback(() => {
    if (!canStartChat || !userInfo || !currentUser) return;

    const chatInfo: IChat = {
      entityType: "chat-association",
      partitionKey: `user#${currentUser.sub}`,
      sortKey: `chat@user#${userInfo.sub}`,
      title: userInfo.name,
      type: "private",
      gsi2PK: `user#${currentUser.sub}`,
      gsi2SK: `chat-timestamp#${new Date().toISOString()}`,
      unreadMessages: 0,
      user: currentUser,
      _userEmail: userInfo.email,
    };

    setSelectedChat?.(chatInfo);
    dismiss?.();
  }, [canStartChat, userInfo, currentUser, setSelectedChat, dismiss]);

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      dismiss?.();
    }
  };

  /*---------- Renders ----------*/
  const renderUserCard = () => (
    <UserInfoCard>
      <ProfilePicture size={64} userInfo={userInfo} />
      <UserInfoSection>
        <UserNameTitle>{userInfo?.name}</UserNameTitle>
        <UserEmailSubtitle>{userInfo?.email}</UserEmailSubtitle>
      </UserInfoSection>
    </UserInfoCard>
  );

  const renderUserNotFound = () => {
    if (!emailInput || !userNotFoundInCurrentSearch) return null;

    return <UserNotFoundLabel>User not found</UserNotFoundLabel>;
  };

  return (
    <ModalContainer onKeyDown={handleOnKeyDown}>
      <ModalTitle>New Conversation</ModalTitle>
      <TextInput
        value={emailInput}
        label="User email"
        loading={loadingUser}
        type="email"
        autoFocus
        debounceInterval={500}
        placeholder="Enter the user's email address"
        onTextChange={handleOnTextChange}
        onDebounce={handleOnDebounce}
        onEnterPress={handleStartChat}
      />
      <PreviewContainer>
        {userInfo ? renderUserCard() : renderUserNotFound()}
      </PreviewContainer>
      <ButtonsContainer>
        <Button onClick={dismiss} variant="secondary">
          Cancel
        </Button>
        <Button disabled={!canStartChat} onClick={handleStartChat}>
          Start chat
        </Button>
      </ButtonsContainer>
    </ModalContainer>
  );
};

export default NewConversationModal;
