/*---------- External ----------*/
import { ReactNode } from "react";

/*---------- Types ----------*/
import { IUser } from "@/@types/user";
import { ChatType, IChat, IGroupInfo, MessageType } from "@/@types/chat";

export type GroupUsers = { [key: string]: Omit<IUser, "sub"> };

export interface SendWSMessageInput {
  content: string;
  messageType: MessageType;
  userSub: string;
  chatType: ChatType;
  tempId: string;
  imageUrl?: string;
}

export interface ChatsProviderProps {
  children?: ReactNode;
}

export interface IChatsContext {
  loadingChats: boolean;
  loadingGroupInfo: boolean;
  loadingGroupUsers: boolean;
  loadingChatUserInfo: boolean;
  chats?: IChat[];
  selectedChat?: IChat;
  currentGroupInfo?: IGroupInfo;
  currentGroupUsers?: GroupUsers;
  currentChatUserInfo?: IUser;

  loadChats?: () => Promise<void>;
  sendMessage?: (input: SendWSMessageInput) => void;
  setSelectedChat?: (chat?: IChat) => void;
  markMessagesAsRead?: (chat: IChat) => void;
}
