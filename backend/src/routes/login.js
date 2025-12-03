import express from 'express';
import loginUser from '../controllers/login';
import loginMiddleware from '../middlewares/login.js';

const router = express.Router();
router.post('/', loginMiddleware, loginUser);
export default router;