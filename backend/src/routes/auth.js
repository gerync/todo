import express from "express";
import registerController from "../controllers/auth/register.js";
import registerMiddleware from "../middlewares/register.js";

import loginController from "../controllers/auth/login.js";
import loginMiddleware from "../middlewares/login.js";

import logoutMiddleware from "../middlewares/logout.js";
import logoutController from "../controllers/auth/logout.js";

const router = express.Router();
router.post("/register", registerMiddleware, registerController);
router.post("/login", loginMiddleware, loginController);
router.post("/logout", logoutMiddleware, logoutController);



export default router;