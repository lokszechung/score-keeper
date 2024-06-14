import express from "express";
import authRouter from "./routes/auth.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/api/auth", authRouter);

app.listen(5005, () => {
	console.log("Server is running on port 5005");
});
