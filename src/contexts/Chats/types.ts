/*---------- External ----------*/
import { ReactNode } from "react";

/*---------- Types ----------*/
import { IUser } from "@/@types/user";
import { IChatAssociation, IGroupInfo } from "@/@types/chat";

export type GroupUsers = { [key: string]: Omit<IUser, "sub"> };

export interface ChatsProviderProps {
  children?: ReactNode;
}

export interface IChatsContext {
  loadingChats: boolean;
  loadingGroupInfo: boolean;
  loadingGroupUsers: boolean;
  loadingChatUserInfo: boolean;
  chats?: IChatAssociation[];
  selectedChat?: IChatAssociation;
  currentGroupInfo?: IGroupInfo;
  currentGroupUsers?: GroupUsers;
  currentChatUserInfo?: IUser;

  loadChats?: () => Promise<void>;
  setSelectedChat?: (chat?: IChatAssociation) => void;
}
