import { createUser, findUser } from "../DAO/user.dao.js";
import { ConflictError, UnauthorizedError } from "../utils/errorhandler.js";
import { sign_jwt } from "../utils/helper.js";

export const userRegister = async (name, email, password) => {
  const user = await findUser(email);
  if (user) throw new ConflictError("user Already Exists");
  const newUser = await createUser(name, email, password);
  const token = sign_jwt({ id: newUser._id });
  return {token , user};
};

export const userLogin = async (email, password) => {
  const user = await findUser(email);
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const isMatch = await user.ComparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const token = sign_jwt({ id: user._id });
  return { token, user };
};
