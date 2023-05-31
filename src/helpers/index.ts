import crypto from "crypto";
import bcrypt from "bcrypt";

export const genTokenKey = (text: string) => {
  const token = bcrypt.hashSync(text, 10);
  return token;
};
