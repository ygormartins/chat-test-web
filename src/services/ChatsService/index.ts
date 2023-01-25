/*---------- Clients ----------*/
import { APIClient } from "@/clients/APIClient";

/*---------- Types ----------*/
import { IChat } from "@/@types/chat";
import { IStatusResponse } from "@/@types/api";

export const getUserChats = async (): Promise<{ data: IChat[] }> => {
  const { data } = await APIClient.get<{ data: IChat[] }>("/chats");

  return data;
};

export const markAsRead = async (
  chatSortKey: string
): Promise<IStatusResponse> => {
  const { data } = await APIClient.put<IStatusResponse>("/chats/read", {
    chatSortKey,
  });

  return data;
};
