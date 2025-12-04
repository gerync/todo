import adminMiddleware from "../middlewares/admin";
import express from "express";
import listusers from "../controllers/listusers";

const router = express.Router();
router.get('/', adminMiddleware, listusers);
export default router;