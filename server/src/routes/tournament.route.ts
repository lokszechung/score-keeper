import express from "express";

import createTournamentController from "../controllers/tournamentControllers/createTournament.controller";
import secureRoute from "../middleware/secureRoute";
import getTournamentController from "../controllers/tournamentControllers/getTournament.controller";
import updateTournamentController from "../controllers/tournamentControllers/updateTournament.controller";

const router = express.Router();

router.route("/create").post(secureRoute, createTournamentController);
router.route("/:tournamentId").get(getTournamentController);
router.route("/:tournamentId").put(secureRoute, updateTournamentController);

export default router;
