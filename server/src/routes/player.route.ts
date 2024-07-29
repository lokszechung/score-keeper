import express from "express";
import createPlayerController from "../controllers/playerControllers/createPlayer.controller";
import getPlayerController from "../controllers/playerControllers/getPlayer.controller";
import updatePlayerController from "../controllers/playerControllers/updatePlayer.controller";
import secureRoute from "../middleware/secureRoute";

const router = express.Router();

router.route("/create").post(secureRoute, createPlayerController);
router.route("/:playerId").get(getPlayerController);
router.route("/:playerId").put(secureRoute, updatePlayerController);

export default router;
