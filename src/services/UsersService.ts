/*---------- Types ----------*/
import { IUser } from "@/@types/user";

/*---------- Clients ----------*/
import { APIClient } from "@/clients/APIClient";

export const getUserInfo = async (email: string): Promise<IUser> => {
  const { data } = await APIClient.get("/user", { params: { email } });

  return data;
};
