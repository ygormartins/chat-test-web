/*---------- Clients ----------*/
import { APIClient } from "@/clients/APIClient";

/*---------- Types ----------*/
import { IUser } from "@/@types/user";
import { IGetUserInfoInput } from "./@types";

export const getUserInfo = async (input: IGetUserInfoInput): Promise<IUser> => {
  const { data } = await APIClient.get<IUser>("/user", { params: input });

  return data;
};
