import express from 'express';

import addTaskController from '../controllers/addtask.js';
import addTaskMiddleware from '../middlewares/addtask.js';

import listTasksController from '../controllers/listtasks.js';

import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', [authMiddleware, addTaskMiddleware], addTaskController);
router.get('/list/:categoryid', authMiddleware, listTasksController);

export default router;