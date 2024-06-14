import express from "express";
import { login } from "../controllers/auth.controller.js";
const router = express.Router();
router.route("/login").get(login);
export default router;
