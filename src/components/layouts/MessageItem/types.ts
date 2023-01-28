/*---------- Types ----------*/
import { IMessage } from "@/@types/chat";

export interface MessageItemProps {
  message: IMessage;
  groupMessage?: boolean;
  sentByUser?: boolean;
  displayProfilePicture?: boolean;
}
