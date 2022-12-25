/*---------- Types ----------*/
import { IChat } from "@/@types/chat";

export interface ConversationScreenProps {
  chatInfo?: IChat;
  setSelectedChat?: (chatInfo?: IChat) => void;
}
