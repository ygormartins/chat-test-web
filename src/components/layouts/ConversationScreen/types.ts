/*---------- Types ----------*/
import { IChat } from "@/@types/chat";
import { IUser } from "@/@types/user";

export interface ConversationScreenProps {
  chatInfo?: IChat;
  sendMessage?: (content: string) => void;
  setSelectedChat?: (chatInfo?: IChat) => void;
  chatUserInfo?: IUser;
}
