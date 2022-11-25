/*---------- Types ----------*/
import { IChat } from "@/@types/chat";

export interface ChatsItemProps {
  chatInfo: IChat;
  onClick?: (chatInfo: IChat) => void;
}
