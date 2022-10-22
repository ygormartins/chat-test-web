/*---------- External ----------*/
import { HmacSHA256, enc as CryptoEnc } from "crypto-js";

export const generateSecretHash = (username: string): string => {
  const hash = HmacSHA256(
    `${username}ib4d59vkkp5aki8fuv8n9dmm3`,
    "me6n9q1brs7t92md4juqitm7mg2uodjqvc81v402vba1tt91ncp"
  ).toString(CryptoEnc.Base64);

  return hash;
};
