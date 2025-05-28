import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./src/configs/mongo.config.js";
import urlRouter from "./src/routes/shortUrl.route.js";
import { redirectUrl } from "./src/controllers/shortUrl.controller.js";
import { ErrorHandler } from "./src/utils/errorhandler.js";
import cors from "cors";
import authRouter from "./src/routes/auth.route.js";
import userRouter from "./src/routes/user.route.js";
config({ path: "./.env" });
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello From Server");
});

app.use("/api/create", urlRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.get("/favicon.ico", (req, res) => res.sendStatus(204));
app.get("/:id", redirectUrl);
app.use(ErrorHandler);

app.listen(3000, () => {
  connectDB();
  console.log("server is running on http://localhost:3000");
});
