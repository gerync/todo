import express from 'express';

import addCategoryController from '../controllers/addcategory.js';
import addCategoryMiddleware from '../middlewares/addcategory.js';
import authMiddleware from '../middlewares/auth.js';
import listCategoriesController from '../controllers/listcategories.js';

const router = express.Router();

router.post('/add', [authMiddleware, addCategoryMiddleware], addCategoryController);
router.get('/list', authMiddleware, listCategoriesController);

export default router;