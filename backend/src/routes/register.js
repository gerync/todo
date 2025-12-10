import registerUser from "../controllers/register.js";
import registerMiddleware from '../middlewares/register.js';
import express from "express";

const router = express.Router();
router.post("/register", registerMiddleware, registerUser);
export default router;