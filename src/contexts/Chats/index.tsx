/*---------- External ----------*/
import React, { useCallback, useContext, useEffect, useState } from "react";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";

/*---------- Services ----------*/

/*---------- Types ----------*/
import { IChatAssociation, IGroupInfo } from "@/@types/chat";
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

  const [chats, setChats] = useState<IChatAssociation[]>();
  const [selectedChat, setSelectedChat] = useState<IChatAssociation>();
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
          userName: "My Friend",
          userSub: "0",
        },
        partitionKey: `user#${user.sub}`,
        sortKey: "chat@user#0",
        title: "My Friend",
        type: "private",
        gsi2PK: `user#${user.sub}`,
        gsi2SK: "chat-timestamp#2022-11-23T19:54:14Z",
        gsi1PK: "group#uuid",
        gsi1SK: `user#${user.sub}`,
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
        name: "My Friend",
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
      name: "My Friend",
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
