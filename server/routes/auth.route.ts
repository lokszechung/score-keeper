import express from "express";

import signUpUser from "../controllers/authControllers/signUpUser.controller.js";
import logInUser from "../controllers/authControllers/logInUser.controller.js";
import logOutUser from "../controllers/authControllers/logOutUser.controller.js";
import getMe from "../controllers/authControllers/getMe.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.route("/signup").post(signUpUser);
router.route("/login").post(logInUser);
router.route("/logout").post(logOutUser);
router.route("/me").get(secureRoute, getMe);

export default router;
