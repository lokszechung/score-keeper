import express from "express";
import getProfileController from "../controllers/profileControllers/getProfile.controller";

const router = express.Router();

router.route("/:userId").get(getProfileController);

export default router;
