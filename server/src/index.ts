import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import tournamentRouter from "./routes/tournament.route";
import profileRouter from "./routes/profile.route";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/tournament", tournamentRouter);

app.listen(5005, () => {
	console.log("Server is running on port 5005");
});
