/*---------- Clients ----------*/
import { APIClient } from "@/clients/APIClient";

/*---------- Types ----------*/
import { IChat } from "@/@types/chat";

export const getUserChats = async (): Promise<{ data: IChat[] }> => {
  const { data } = await APIClient.get<{ data: IChat[] }>("/chats");

  return data;
};
