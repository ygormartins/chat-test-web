/*---------- Interfaces ----------*/
interface ICognitoError {
  response: {
    data: {
      message: string;
    };
  };
}

export const getCognitoError = <T>(error: unknown): T => {
  const typedError = error as ICognitoError;

  return {
    result: "ERROR",
    errorMessage: typedError.response.data.message,
  } as unknown as T;
};
