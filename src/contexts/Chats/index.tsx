/*---------- External ----------*/
import React, { useCallback, useContext, useEffect, useState } from "react";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";

/*---------- Services ----------*/

/*---------- Types ----------*/
import { IChat, IGroupInfo } from "@/@types/chat";
import { ChatsProviderProps, GroupUsers, IChatsContext } from "./types";
import { IUser } from "@/@types/user";

export const ChatsContext = React.createContext<IChatsContext>({
  loadingChats: false,
  loadingGroupInfo: false,
  loadingGroupUsers: false,
  loadingChatUserInfo: false,
});

export const ChatsProvider: React.FC<ChatsProviderProps> = ({ children }) => {
  /*---------- Contexts ----------*/
  const { status, user } = useContext(AuthContext);

  /*---------- Public States ----------*/
  const [loadingChats, setIsLoadingChats] = useState<boolean>(false);
  const [loadingGroupInfo, setIsLoadingGroupInfo] = useState<boolean>(false);
  const [loadingGroupUsers, setIsLoadingGroupUsers] = useState<boolean>(false);
  const [loadingChatUserInfo, setIsloadingChatUserInfo] =
    useState<boolean>(false);

  const [chats, setChats] = useState<IChat[]>();
  const [selectedChat, setSelectedChat] = useState<IChat>();
  const [currentGroupInfo, setCurrentGroupInfo] = useState<IGroupInfo>();
  const [currentGroupUsers, setCurrentGroupUsers] = useState<GroupUsers>();
  const [currentChatUserInfo, setCurrentChatUserInfo] = useState<IUser>();

  /*---------- Handlers ----------*/
  const loadChats = useCallback(async (): Promise<void> => {
    if (!user || status === "UNAUTHENTICATED") return;

    setIsLoadingChats(true);

    // TODO: make API call to load user chats
    setChats([
      {
        entityType: "chat-association",
        lastMessage: {
          preview: "This was the last message",
          timestamp: "2022-11-23T19:54:14Z",
          type: "text",
          userName: "José Games",
          userSub: "0",
        },
        partitionKey: `user#${user.sub}`,
        sortKey: "chat@user#0",
        title: "José Games",
        type: "private",
        gsi2PK: `user#${user.sub}`,
        gsi2SK: "chat-timestamp#2022-11-23T19:54:14Z",
        unreadMessages: 1,
        // gsi1PK: "group#uuid",
        // gsi1SK: `user#${user.sub}`,
        user,
      },
      {
        entityType: "chat-association",
        lastMessage: {
          preview: "I've been putting up with your shit for way too long",
          timestamp: "2022-11-21T12:39:14Z",
          type: "text",
          userName: user.name,
          userSub: user.sub,
        },
        partitionKey: `user#${user.sub}`,
        sortKey: "chat@user#1",
        title: "Ex",
        type: "private",
        gsi2PK: `user#${user.sub}`,
        unreadMessages: 0,
        gsi2SK: "chat-timestamp#2022-11-21T12:39:14Z",
        // gsi1PK: "group#uuid",
        // gsi1SK: `user#${user.sub}`,
        user,
      },
    ]);

    setIsLoadingChats(false);
  }, [status, user]);

  const getCurrentGroupInfo = useCallback(async (): Promise<void> => {
    setIsLoadingGroupInfo(true);

    // TODO: make API call to load group info
    const groupInfo: IGroupInfo = {
      createdAt: "2022-11-23T19:54:14Z",
      title: "My Fucking Awesome Group",
      entityType: "group",
      createdBy: user!,
      partitionKey: "group#uuid",
      sortKey: "root",
      gsi1PK: "group",
      gsi1SK: "group#uuid",
    };

    setCurrentGroupInfo(groupInfo);
    setIsLoadingGroupInfo(false);
  }, [user]);

  const getCurrentGroupUsers = async (): Promise<void> => {
    setIsLoadingGroupUsers(true);

    // TODO: make API call to load group users
    const users: GroupUsers = {
      "0": {
        email: "user@email.com",
        name: "José Games",
      },
    };

    setCurrentGroupUsers(users);
    setIsLoadingGroupUsers(false);
  };

  const getGroupChatDetails = useCallback(async (): Promise<void> => {
    await Promise.all([getCurrentGroupInfo, getCurrentGroupUsers]);
  }, [getCurrentGroupInfo]);

  const getPrivateChatDetails = async (): Promise<void> => {
    setIsloadingChatUserInfo(true);

    // TODO: get private chat info from API
    const userInfo: IUser = {
      sub: "0",
      email: "user@email.com",
      name: "José Games",
    };

    setCurrentChatUserInfo(userInfo);
    setIsloadingChatUserInfo(false);
  };

  /*---------- Effects ----------*/
  useEffect(() => {
    loadChats();
  }, [user, status, loadChats]);

  useEffect(() => {
    if (!selectedChat) return;

    if (selectedChat.type === "group") {
      getGroupChatDetails();
    } else {
      getPrivateChatDetails();
    }
  }, [selectedChat, getGroupChatDetails]);

  return (
    <ChatsContext.Provider
      value={{
        loadingChats,
        loadingGroupInfo,
        loadingGroupUsers,
        loadingChatUserInfo,
        chats,
        selectedChat,
        currentGroupInfo,
        currentGroupUsers,
        currentChatUserInfo,
        loadChats,
        setSelectedChat,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
