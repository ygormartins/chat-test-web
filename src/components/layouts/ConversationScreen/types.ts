/*---------- Types ----------*/
import { IChat, IMessage } from "@/@types/chat";
import { IUser } from "@/@types/user";

export interface ConversationScreenProps {
  chatInfo?: IChat;
  chatMessagesList?: IMessage[];
  sendMessage?: (content: string) => void;
  setSelectedChat?: (chatInfo?: IChat) => void;
  chatUserInfo?: IUser;
}
