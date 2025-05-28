import { verify_jwt } from "../utils/helper.js";
import { findById } from "../DAO/user.dao.js";
import { Authexpire } from "../utils/errorhandler.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Authexpire("No token provided");
    }
    const decoded = verify_jwt(token);
    const user = await findById(decoded.id);
    if (!user) {
      throw new Authexpire("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    next(new Authexpire("Authentication failed"));
  }
};

export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = verify_jwt(token);
      const user = await findById(decoded.id);
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    next();
  }
};
