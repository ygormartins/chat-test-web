/*---------- External ----------*/
import { ReactNode } from "react";

/*---------- Types ----------*/
import { IUser } from "@/@types/user";
import { IChat, IGroupInfo } from "@/@types/chat";

export type GroupUsers = { [key: string]: Omit<IUser, "sub"> };

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
  setSelectedChat?: (chat?: IChat) => void;
}
