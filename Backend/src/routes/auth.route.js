import express from 'express';
import { register_user, login_user, getMe, logout_user } from '../controllers/auth.controller.js';
import {authMiddleware} from "../middleware/auth.middleware.js";

const authRouter = express.Router();
authRouter.post('/register', register_user);
authRouter.post('/login', login_user);
authRouter.get("/logout", logout_user);
authRouter.get("/me", authMiddleware, getMe)


export default authRouter;