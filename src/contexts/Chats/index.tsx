/*---------- External ----------*/
import React, { useCallback, useContext, useEffect, useState } from "react";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";

/*---------- Clients ----------*/
import * as WebSocketClient from "@/clients/WebSocketClient";

/*---------- Services ----------*/
import { getUserInfo } from "@/services/UsersService";

/*---------- Types ----------*/
import { IUser } from "@/@types/user";
import { IChat, IGroupInfo } from "@/@types/chat";
import { ChatsProviderProps, GroupUsers, IChatsContext } from "./types";
import {
  IWebSocketChatReceivedMessage,
  IWebSocketMessage,
} from "@/@types/websocket";

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
        entityType: "chat",
        lastMessage: {
          preview: "This was the last message",
          timestamp: "2022-11-23T19:54:14Z",
          messageType: "text",
          userName: "José Games",
          userSub: "0",
        },
        partitionKey: `user#${user.sub}`,
        sortKey: "chat@user#0",
        title: "José Games",
        chatType: "private",
        gsi2PK: `user#${user.sub}`,
        gsi2SK: "chat-timestamp#2022-11-23T19:54:14Z",
        unreadMessages: 1,
        // gsi1PK: "group#uuid",
        // gsi1SK: `user#${user.sub}`,
        user,
      },
      {
        entityType: "chat",
        lastMessage: {
          preview: "I've been putting up with your shit for way too long",
          timestamp: "2022-11-21T12:39:14Z",
          messageType: "text",
          userName: user.name,
          userSub: user.sub,
        },
        partitionKey: `user#${user.sub}`,
        sortKey: "chat@user#1",
        title: "Kanye West",
        chatType: "private",
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

  const handleSortChatsList = (chatList: IChat[]): IChat[] => {
    const sortedList = chatList.sort((a, b) => {
      if (!a?.gsi2SK && !b?.gsi2SK) return -1;
      if (!a?.gsi2SK) return 1;
      if (!b?.gsi2SK) return -1;

      return a.gsi2SK > b.gsi2SK ? -1 : a.gsi2SK < b.gsi2SK ? 1 : 0;
    });

    return sortedList;
  };

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

  const getPrivateChatDetails = useCallback(async (): Promise<void> => {
    setIsloadingChatUserInfo(true);

    const currentUserInfo: IUser = {
      email: selectedChat?._userEmail || "",
      name: selectedChat?.title || "",
      sub: selectedChat?.sortKey.split("#")[1] || "",
    };

    let newUserInfo: IUser;

    try {
      if (selectedChat?._userEmail) {
        // If chatting with the user for the first time
        const userChatDetails = await getUserInfo({
          email: selectedChat._userEmail,
        });

        newUserInfo = userChatDetails;
      } else {
        // If there's already chat info
        const userChatDetails = await getUserInfo({
          sub: currentUserInfo.sub,
        });

        newUserInfo = userChatDetails;
      }
    } catch (_error) {
      newUserInfo = currentUserInfo;
    }

    if (newUserInfo.name !== currentUserInfo.name) {
      // TODO: make call to update chat object

      setSelectedChat(
        (currentChat) =>
          ({ ...currentChat, title: newUserInfo.name } as IChat | undefined)
      );
    }

    setCurrentChatUserInfo(newUserInfo);
    setIsloadingChatUserInfo(false);
  }, [selectedChat?._userEmail, selectedChat?.sortKey, selectedChat?.title]);

  const markMessagesAsRead = (chat: IChat) => {
    setChats((previousChatsList) => {
      const chatsList = [...(previousChatsList || [])];

      const currentChatIndex = chatsList?.findIndex(
        (chatItem) => chatItem.sortKey === chat.sortKey
      );

      if (currentChatIndex !== -1) {
        chatsList[currentChatIndex] = {
          ...chatsList[currentChatIndex],
          unreadMessages: 0,
        };
      }

      return chatsList;
    });

    // TODO: make API call to mark messages as read
  };

  const handleNewChatMessage = useCallback(
    async ({
      data: messageData,
    }: IWebSocketMessage<IWebSocketChatReceivedMessage>) => {
      setChats((currentChatsList) => {
        const filterSortKey =
          messageData.chatType === "group"
            ? `chat@group#${messageData.groupId}`
            : `chat@user#${messageData.sender.sub}`;

        let noOfUnreadMessages = 0;

        const existingChatIndex = currentChatsList?.findIndex(
          (chat) => chat.sortKey === filterSortKey
        );

        if (
          typeof existingChatIndex !== "undefined" &&
          existingChatIndex !== -1
        ) {
          const updatedChatsList = [...(currentChatsList || [])];
          noOfUnreadMessages =
            updatedChatsList[existingChatIndex].unreadMessages || 0;

          if (selectedChat?.sortKey !== filterSortKey) {
            noOfUnreadMessages += 1;
          }

          updatedChatsList[existingChatIndex] = {
            ...updatedChatsList[existingChatIndex],
            unreadMessages: noOfUnreadMessages,
            gsi2PK: `user#${user?.sub}`,
            gsi2SK: `chat-timestamp#${messageData.timestamp}`,
            lastMessage: {
              messageType: messageData.messageType,
              preview: messageData.content,
              timestamp: messageData.timestamp,
              userName: messageData.sender.name,
              userSub: messageData.sender.sub,
            },
          };

          return handleSortChatsList(updatedChatsList);
        }

        const newChatsList: IChat[] = [
          ...(currentChatsList || []),
          {
            entityType: "chat",
            partitionKey: `user#${user?.sub}`,
            sortKey: filterSortKey,
            title: messageData.sender.name,
            chatType: messageData.chatType,
            unreadMessages: noOfUnreadMessages + 1,
            gsi2PK: `user#${user?.sub}`,
            gsi2SK: `chat-timestamp#${messageData.timestamp}`,
            // gsi1PK: "group#uuid",
            // gsi1SK: `user#${user.sub}`,
            user: user as IUser,
            lastMessage: {
              messageType: messageData.messageType,
              preview: messageData.content,
              timestamp: messageData.timestamp,
              userName: messageData.sender.name,
              userSub: messageData.sender.sub,
            },
          },
        ];

        return handleSortChatsList(newChatsList);
      });
    },
    [selectedChat, user]
  );

  const handleNewWebSocketMessage = useCallback(
    async (message: IWebSocketMessage) => {
      switch (message.action) {
        case "receive-message":
          await handleNewChatMessage(
            message as IWebSocketMessage<IWebSocketChatReceivedMessage>
          );
          break;
      }
    },
    [handleNewChatMessage]
  );

  const handleStartClient = useCallback(async () => {
    try {
      await WebSocketClient.startClient({
        onMessage: handleNewWebSocketMessage,
      });
    } catch (_error) {}
  }, [handleNewWebSocketMessage]);

  /*---------- Effects ----------*/
  useEffect(() => {
    if (status !== "AUTHENTICATED") return;

    handleStartClient();
  }, [handleStartClient, status]);

  useEffect(() => {
    loadChats();
  }, [user, status, loadChats]);

  useEffect(() => {
    setCurrentChatUserInfo(undefined);
    setCurrentGroupInfo(undefined);
    setCurrentGroupUsers(undefined);
    setIsLoadingGroupInfo(false);
    setIsLoadingGroupUsers(false);
    setIsloadingChatUserInfo(false);

    if (!selectedChat?.sortKey || !selectedChat?.partitionKey) return;

    if (selectedChat.chatType === "group") {
      getGroupChatDetails();
    } else {
      getPrivateChatDetails();
    }
  }, [
    selectedChat?.chatType,
    selectedChat?.partitionKey,
    selectedChat?.sortKey,
    getGroupChatDetails,
    getPrivateChatDetails,
  ]);

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
        markMessagesAsRead,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
