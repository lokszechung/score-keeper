import express from "express";
import createTeamController from "../controllers/teamControllers/createTeam.controller";
import getTeamController from "../controllers/teamControllers/getTeam.controller";
import updateTeamController from "../controllers/teamControllers/updateTeam.controller";
import secureRoute from "../middleware/secureRoute";

const router = express.Router();

//! adding secure route here for now will decide whether logged in user is necessary later
router.route("/create").post(secureRoute, createTeamController);
router.route("/:teamId").get(getTeamController);
router.route("/:teamId").put(secureRoute, updateTeamController);

//TODO maybe later can add a route to create a team independently of a tournament which wouldn't require a tournamentId

export default router;
