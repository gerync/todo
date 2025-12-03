import addTask from "../controllers/addtask";
import express from "express";

const router = express.Router();
router.post("/", addTask);
export default router;