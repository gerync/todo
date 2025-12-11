import express from 'express';

import authMiddleware from '../middlewares/auth.js';

import userInfoController from '../controllers/user/getuserinfo.js';

import changeInfoController from '../controllers/user/changeinfo.js';
import changeInfoMiddleware from '../middlewares/changeinfo.js';

import changePasswordController from '../controllers/user/changepassword.js';
import changePasswordMiddleware from '../middlewares/changepassword.js';

const router = express.Router();
router.get('/', authMiddleware, userInfoController);
router.patch('/changeinfo', [authMiddleware, changeInfoMiddleware], changeInfoController);
router.patch('/changepassword', [authMiddleware, changePasswordMiddleware], changePasswordController);


export default router;