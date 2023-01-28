/*---------- Types ----------*/
import { IMessage } from "@/@types/chat";
import { IUser } from "@/@types/user";

export interface MessagesListProps {
  messages: IMessage[];
  user?: IUser;
}
