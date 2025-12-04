import express from "express";
import addTask from "../controllers/addtask.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.get("/", auth, addTask);
export default router;