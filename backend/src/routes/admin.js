import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import isAdmin from '../middlewares/isadmin.js';

import categoryController from '../controllers/admin/category.js';
import taskController from '../controllers/admin/tasks.js';
import userController from '../controllers/admin/users.js';

import {
    AddCategoryAdminMiddleware,
    EditCategoryAdminMiddleware,
    DeleteCategoryAdminMiddleware
} from '../middlewares/admin/category.js';

import {
    AddTaskAdminMiddleware,
    EditTaskAdminMiddleware,
    DeleteTaskAdminMiddleware
} from '../middlewares/admin/task.js';

import {
    EditUserAdminMiddleware,
    DeleteUserAdminMiddleware,
    SuspendUserAdminMiddleware,
    ReactivateUserAdminMiddleware
} from '../middlewares/admin/user.js';

const router = express.Router();

router.post('/category/add', [authMiddleware, isAdmin, AddCategoryAdminMiddleware], categoryController.AddCategoryController
);

router.patch('/category/edit', [authMiddleware, isAdmin, EditCategoryAdminMiddleware], categoryController.EditCategoryController
);

router.delete('/category/delete', [authMiddleware, isAdmin, DeleteCategoryAdminMiddleware], categoryController.DeleteCategoryController
);

router.post('/task/add', [authMiddleware, isAdmin, AddTaskAdminMiddleware], taskController.AddTask
);

router.patch('/task/edit', [authMiddleware, isAdmin, EditTaskAdminMiddleware], taskController.EditTaskController
);

router.delete('/task/delete', [authMiddleware, isAdmin, DeleteTaskAdminMiddleware], taskController.DeleteTaskController
);

router.patch('/user/edit', [authMiddleware, isAdmin, EditUserAdminMiddleware], userController.EditUserController
);

router.delete('/user/delete', [authMiddleware, isAdmin, DeleteUserAdminMiddleware], userController.DeleteUserController
);

router.post('/user/suspend', [authMiddleware, isAdmin, SuspendUserAdminMiddleware], userController.SuspendUserController
);

router.post('/user/reactivate', [authMiddleware, isAdmin, ReactivateUserAdminMiddleware], userController.ReactivateUserController
);

export default router;
