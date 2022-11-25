/*---------- Types ----------*/
import { IChat } from "@/@types/chat";

export interface ChatsListProps {
  chatsList: IChat[];
  onChatItemClick?: (chatInfo: IChat) => void;
}
