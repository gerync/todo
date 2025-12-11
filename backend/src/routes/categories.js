import express from 'express';

import addCategoryController from '../controllers/category/addcategory.js';
import addCategoryMiddleware from '../middlewares/addcategory.js';
import authMiddleware from '../middlewares/auth.js';
import deleteCategoryMiddleware from '../middlewares/deletecategory.js';
import editCategoryMiddleware from '../middlewares/editcategory.js';
import listCategoriesController from '../controllers/category/listcategories.js';
import deleteCategoryController from '../controllers/category/deletecategory.js';
import editCategoryController from '../controllers/category/editcategory.js';

const router = express.Router();

router.post('/add', [authMiddleware, addCategoryMiddleware], addCategoryController);
router.get('/list', authMiddleware, listCategoriesController);
router.patch('/edit', [authMiddleware, editCategoryMiddleware], editCategoryController);
router.delete('/delete', [authMiddleware, deleteCategoryMiddleware], deleteCategoryController);

export default router;