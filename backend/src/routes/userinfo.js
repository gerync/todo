import express from 'express';

import authMiddleware from '../middlewares/auth.js';

import userInfoController from '../controllers/getuserinfo.js';

import changeInfoController from '../controllers/changeinfo.js';
import changeInfoMiddleware from '../middlewares/changeinfo.js';

const router = express.Router();
router.get('/', authMiddleware, userInfoController);
router.post('/change', [authMiddleware, changeInfoMiddleware], changeInfoController);

export default router;