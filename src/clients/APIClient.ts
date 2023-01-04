/*---------- External ----------*/
import { getAccessToken } from "@/services/AuthService";
import Axios from "axios";

export const APIClient = Axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

APIClient.interceptors.request.use(async (config) => {
  if (config.headers) {
    const idToken = await getAccessToken();

    if (!idToken) {
      throw new Error("Unauthenticated");
    }

    config.headers.Authorization = `Bearer ${idToken}`;
  }

  return config;
});
