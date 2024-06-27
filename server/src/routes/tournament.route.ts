import express from "express";

import createTournamentController from "../controllers/tournamentControllers/createTournament.controller";
import secureRoute from "../middleware/secureRoute";

const router = express.Router();

router.route("/create").post(secureRoute, createTournamentController);

export default router;
