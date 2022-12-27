/*---------- External ----------*/
import Axios from "axios";

export const AuthClient = Axios.create({
  baseURL: import.meta.env.VITE_COGNITO_IDP_ENDPOINT,
  headers: {
    "Content-Type": "application/x-amz-json-1.1",
  },
});
