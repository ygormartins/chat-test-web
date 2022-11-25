/*---------- Types ----------*/
import { IDatabaseItem } from "@/@types/database";
import { IUser } from "@/@types/user";

export type MessageType = "text" | "image";

export type ChatType = "private" | "group";

/*---------- Interfaces ----------*/
export interface IMessage extends IDatabaseItem {
  user: IUser;
  content: string;
  type: MessageType;
  timestamp: string;
  imageUrl?: string;
}

export interface IChatLastMessage {
  userName: string;
  userSub: string;
  timestamp: string;
  preview: string;
  type: MessageType;
}

export interface IChat extends IDatabaseItem {
  type: ChatType;
  title: string;
  user: IUser;
  unreadMessages: number;
  lastMessage?: IChatLastMessage;
}

export interface IGroupInfo extends IDatabaseItem {
  title: string;
  createdAt: string;
  createdBy: IUser;
  lastMessage?: IChatLastMessage;
}
