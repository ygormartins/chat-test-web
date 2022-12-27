/*---------- External ----------*/
import Axios from "axios";

export const APIClient = Axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});
