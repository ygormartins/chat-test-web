/*---------- Types ----------*/
import { IChat } from "@/@types/chat";

export interface ConversationHeaderProps {
  chatInfo?: IChat;
  closeChat?: () => void;
}
