import express from "express";

import createTournamentController from "../controllers/tournamentControllers/createTournament.controller";
import secureRoute from "../middleware/secureRoute";
import getTournamentController from "../controllers/tournamentControllers/getTournament.controller";

const router = express.Router();

router.route("/create").post(secureRoute, createTournamentController);
router.route("/:tournamentId").get(getTournamentController);

export default router;
