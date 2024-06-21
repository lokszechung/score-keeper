import express from "express";

import signUpUser from "../controllers/authControllers/signUpUser.controller";
import logInUser from "../controllers/authControllers/logInUser.controller";
import logOutUser from "../controllers/authControllers/logOutUser.controller";
import getMe from "../controllers/authControllers/getMe.controller";
import secureRoute from "../middleware/secureRoute";

const router = express.Router();

router.route("/signup").post(signUpUser);
router.route("/login").post(logInUser);
router.route("/logout").post(logOutUser);
router.route("/me").get(secureRoute, getMe);

export default router;
