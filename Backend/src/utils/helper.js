import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";


export const generateNanoid = (length) => {
  const id = nanoid(length);
  return id;
};

export const sign_jwt = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"}); // Change to 1 hour
    return token;
};

export const verify_jwt = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
};
