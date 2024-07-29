import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route";
import tournamentRouter from "./routes/tournament.route";
import profileRouter from "./routes/profile.route";
import teamRouter from "./routes/team.route";
import playerRouter from "./routes/player.route";
import fixtureRouter from "./routes/fixture.route";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser());

app.use((req, _res, next) => {
	console.log("Cookies: ", req.cookies);
	next();
});

app.use(express.json());

const corsOptions = { origin: "http://127.0.0.1:5173", credentials: true };

app.use(cors(corsOptions));

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/tournament", tournamentRouter);
app.use("/api/team", teamRouter);
app.use("/api/player", playerRouter);
app.use("/api/fixture", fixtureRouter);

app.listen(5005, () => {
	console.log("Server is running on port 5005");
});
