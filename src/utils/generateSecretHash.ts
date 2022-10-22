/*---------- External ----------*/
import { HmacSHA256, enc as CryptoEnc } from "crypto-js";

export const generateSecretHash = (username: string): string => {
  const hash = HmacSHA256(
    `${username}${import.meta.env.VITE_COGNITO_CLIENT_ID}`,
    import.meta.env.VITE_COGNITO_CLIENT_SECRET
  ).toString(CryptoEnc.Base64);

  return hash;
};
