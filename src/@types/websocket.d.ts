/*---------- Types ----------*/
import { ChatType, MessageType } from "@/@types/chat";
import { IUser } from "@/@types/user";

/*---------- Interfaces ----------*/
export interface IWebSocketMessage<T = unknown> {
  action: string;
  data: T;
}

export interface IWebSocketChatReceivedMessage {
  chatType: ChatType;
  content: string;
  messageId: string;
  messageType: MessageType;
  sender: IUser;
  timestamp: string;
  groupId?: string;
}
