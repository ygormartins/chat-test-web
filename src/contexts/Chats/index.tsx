/*---------- External ----------*/
import React, { useCallback, useContext, useEffect, useState } from "react";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";

/*---------- Clients ----------*/
import * as WebSocketClient from "@/clients/WebSocketClient";

/*---------- Services ----------*/
import { getUserInfo } from "@/services/UsersService";
import {
  getChatMessages,
  getUserChats,
  markAsRead,
} from "@/services/ChatsService";

/*---------- Types ----------*/
import { IUser } from "@/@types/user";
import { IChat, IGroupInfo, IMessage } from "@/@types/chat";
import {
  ChatsProviderProps,
  GroupUsers,
  IChatsContext,
  SendWSMessageInput,
} from "./types";
import {
  IWebSocketChatReceivedMessage,
  IWebSocketMessage,
} from "@/@types/websocket";
import { SendMessageInput } from "@/clients/WebSocketClient";

export const ChatsContext = React.createContext<IChatsContext>({
  loadingChatMessages: false,
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
  const [loadingChatMessages, setIsLoadingChatMessages] =
    useState<boolean>(false);
  const [loadingGroupInfo, setIsLoadingGroupInfo] = useState<boolean>(false);
  const [loadingGroupUsers, setIsLoadingGroupUsers] = useState<boolean>(false);
  const [loadingChatUserInfo, setIsloadingChatUserInfo] =
    useState<boolean>(false);

  const [chats, setChats] = useState<IChat[]>();
  const [selectedChat, setSelectedChat] = useState<IChat>();
  const [currentChatMessages, setCurrentChatMessages] = useState<IMessage[]>();
  const [currentGroupInfo, setCurrentGroupInfo] = useState<IGroupInfo>();
  const [currentGroupUsers, setCurrentGroupUsers] = useState<GroupUsers>();
  const [currentChatUserInfo, setCurrentChatUserInfo] = useState<IUser>();

  /*---------- Handlers ----------*/
  const loadChats = useCallback(async (): Promise<void> => {
    if (!user || status === "UNAUTHENTICATED") return;

    setIsLoadingChats(true);

    try {
      const { data: chatsList } = await getUserChats();

      setChats(chatsList);
    } catch (_error) {}

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

  const getCurrentChatMessages = useCallback(async (): Promise<void> => {
    if (!selectedChat?.sortKey) return;

    setIsLoadingChatMessages(true);

    try {
      const { data: messagesList } = await getChatMessages(
        selectedChat.sortKey
      );

      setCurrentChatMessages(messagesList);
    } catch (_error) {}

    setIsLoadingChatMessages(false);
  }, [selectedChat?.sortKey]);

  const getCurrentGroupUsers = useCallback(async (): Promise<void> => {
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
  }, []);

  const getGroupChatDetails = useCallback(async (): Promise<void> => {
    await Promise.all([getCurrentGroupInfo(), getCurrentGroupUsers()]);
  }, [getCurrentGroupInfo, getCurrentGroupUsers]);

  const getPrivateChatUserInfo = useCallback(async (): Promise<void> => {
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

  const getPrivateChatDetails = useCallback(async () => {
    await Promise.all([getPrivateChatUserInfo(), getCurrentChatMessages()]);
  }, [getCurrentChatMessages, getPrivateChatUserInfo]);

  const markMessagesAsRead = async (chat: IChat) => {
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

    try {
      await markAsRead(chat.sortKey);
    } catch (_error) {}
  };

  const handleNewChatMessage = useCallback(
    async ({
      data: messageData,
    }: IWebSocketMessage<IWebSocketChatReceivedMessage>) => {
      const filterSortKey =
        messageData.chatType === "group"
          ? `chat@group#${messageData.groupId}`
          : `chat@user#${messageData.sender.sub}`;

      setChats((currentChatsList) => {
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

      if (selectedChat?.sortKey === filterSortKey) {
        setCurrentChatMessages((messages) => {
          const sortedSubsList = [messageData.sender.sub, user?.sub].sort(
            (a, b) => {
              if (!a || !b) return 0;
              return a > b ? -1 : 1;
            }
          );

          const messagePK = `users@${sortedSubsList.join("|")}`;

          const newMessage: IMessage = {
            content: messageData.content,
            entityType: "message",
            messageType: messageData.messageType,
            partitionKey: messagePK,
            sortKey: messageData.messageId,
            timestamp: messageData.timestamp,
            user: messageData.sender,
          };

          return [newMessage, ...(messages || [])];
        });

        try {
          await markAsRead(filterSortKey);
        } catch (_error) {}
      }
    },
    [selectedChat, user]
  );

  const sendMessage = useCallback(
    (input: SendWSMessageInput) => {
      const message: SendMessageInput = {
        action: "send-message",
        data: { ...input },
      };

      WebSocketClient.sendMessage(message);

      const messageTimestamp = new Date().toISOString();

      const filterSortKey =
        input.chatType === "group"
          ? `chat@group#${""}`
          : `chat@user#${input.userSub}`;

      setChats((currentChatsList) => {
        const existingChatIndex = currentChatsList?.findIndex(
          (chat) => chat.sortKey === filterSortKey
        );

        if (
          typeof existingChatIndex !== "undefined" &&
          existingChatIndex !== -1
        ) {
          const updatedChatsList = [...(currentChatsList || [])];

          updatedChatsList[existingChatIndex] = {
            ...updatedChatsList[existingChatIndex],
            unreadMessages: 0,
            gsi2PK: `user#${user?.sub}`,
            gsi2SK: `chat-timestamp#${messageTimestamp}`,
            lastMessage: {
              messageType: input.messageType,
              preview: input.content,
              timestamp: messageTimestamp,
              userName: user?.name || "",
              userSub: user?.sub || "",
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
            title: selectedChat?.title || "",
            chatType: input.chatType,
            unreadMessages: 0,
            gsi2PK: `user#${user?.sub}`,
            gsi2SK: `chat-timestamp#${messageTimestamp}`,
            // gsi1PK: "group#uuid",
            // gsi1SK: `user#${user.sub}`,
            user: user as IUser,
            lastMessage: {
              messageType: input.messageType,
              preview: input.content,
              timestamp: messageTimestamp,
              userName: user?.name || "",
              userSub: user?.sub || "",
            },
          },
        ];

        return handleSortChatsList(newChatsList);
      });

      setCurrentChatMessages((messages) => {
        const sortedSubsList = [input.userSub, user?.sub].sort((a, b) => {
          if (!a || !b) return 0;
          return a > b ? -1 : 1;
        });

        const messagePK = `users@${sortedSubsList.join("|")}`;

        const newMessage: IMessage = {
          content: input.content,
          entityType: "message",
          messageType: input.messageType,
          partitionKey: messagePK,
          sortKey: input.tempId,
          timestamp: new Date().toISOString(),
          user: user as IUser,
        };

        return [newMessage, ...(messages || [])];
      });
    },
    [selectedChat?.title, user]
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
    setCurrentChatMessages(undefined);
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
        loadingChatMessages,
        loadingGroupInfo,
        loadingGroupUsers,
        loadingChatUserInfo,
        chats,
        currentChatMessages,
        selectedChat,
        currentGroupInfo,
        currentGroupUsers,
        currentChatUserInfo,
        loadChats,
        sendMessage,
        setSelectedChat,
        markMessagesAsRead,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
