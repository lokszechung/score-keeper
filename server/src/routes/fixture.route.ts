import express from "express";
import createFixturesController from "../controllers/fixtureControllers/createFixture.controller";
import secureRoute from "../middleware/secureRoute";

const router = express.Router();

router.route("/create").post(secureRoute, createFixturesController);

export default router;
