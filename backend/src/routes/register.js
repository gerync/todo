import registerUser from "../controllers/register";
import registerMiddleware from './middlewares/register.js';
import express from "express";

const router = express.Router();
router.post("/register", registerMiddleware, registerUser);
export default router;