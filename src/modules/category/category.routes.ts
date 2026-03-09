import { Router } from 'express';
import * as CategoryController from './category.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { createCategorySchema, updateCategorySchema } from './category.validation';
import { UserRole } from '../../types';

const router = Router();

// Public Routes
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);

// Admin Only Routes
router.use(authenticate, authorize(UserRole.ADMIN));

router.post('/', validate(createCategorySchema), CategoryController.createCategory);
router.patch('/:id', validate(updateCategorySchema), CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;
