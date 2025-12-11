import express from 'express';

import addTaskController from '../controllers/task/addtask.js';
import addTaskMiddleware from '../middlewares/addtask.js';

import listTasksController from '../controllers/task/listtasks.js';

import editDeleteTaskController from '../controllers/task/editdelete.js';
import editDeleteTaskMiddleware from '../middlewares/editdeletetask.js';

import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', [authMiddleware, addTaskMiddleware], addTaskController);
router.get('/list/:categoryid', authMiddleware, listTasksController);
router.get('/list', authMiddleware, listTasksController);
router.patch('/edit', [authMiddleware, editDeleteTaskMiddleware.EditTaskMiddleware], editDeleteTaskController.EditTaskController);
router.delete('/delete', [authMiddleware, editDeleteTaskMiddleware.DeleteTaskMiddleware], editDeleteTaskController.DeleteTaskController);

export default router;