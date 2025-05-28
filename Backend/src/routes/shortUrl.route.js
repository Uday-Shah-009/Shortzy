import express from "express";
import { createShortUrlAuth, createUrl } from "../controllers/shortUrl.controller.js";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth.middleware.js";
const urlRouter = express.Router();


urlRouter.post("/", optionalAuthMiddleware, createUrl);
urlRouter.post("/custom", authMiddleware, createShortUrlAuth);

export default urlRouter;
