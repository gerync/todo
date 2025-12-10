import adminMiddleware from "../middlewares/admin.js";
import express from "express";
import listusers from "../controllers/listusers.js";

const router = express.Router();
router.get('/', adminMiddleware, listusers);
export default router;