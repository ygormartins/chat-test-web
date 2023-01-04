/*---------- Types ----------*/
import { IChat } from "@/@types/chat";
import { IUser } from "@/@types/user";

export interface ConversationScreenProps {
  chatInfo?: IChat;
  setSelectedChat?: (chatInfo?: IChat) => void;

  chatUserInfo?: IUser;
}
