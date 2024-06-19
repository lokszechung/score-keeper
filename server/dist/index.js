import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.listen(5005, () => {
    console.log("Server is running on port 5005");
});
