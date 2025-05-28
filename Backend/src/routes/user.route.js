import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserUrls } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/urls", authMiddleware, getUserUrls);

export default userRouter;