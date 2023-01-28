/*---------- Types ----------*/
import { IErrorResponse } from "@/@types/api";

/*---------- Interfaces ----------*/
interface IAPIError {
  response: {
    data: { message: string };
  };
}

export const getAPIError = (error: unknown): IErrorResponse => {
  const typedError = error as IAPIError;
  const message = typedError?.response?.data?.message;

  if (message) {
    return {
      message,
    };
  }

  return {
    message: "Unknown error.",
  };
};
