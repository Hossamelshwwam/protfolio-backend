import { Router } from 'express';
import * as ExperienceController from './experience.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { createExperienceSchema, updateExperienceSchema } from './experience.validation';
import { UserRole } from '../../types';

const router = Router();

// Public Routes
router.get('/', ExperienceController.getAllExperiences);
router.get('/:id', ExperienceController.getExperienceById);

// Admin Only Routes
router.use(authenticate, authorize(UserRole.ADMIN));

router.post('/', validate(createExperienceSchema), ExperienceController.createExperience);
router.patch('/:id', validate(updateExperienceSchema), ExperienceController.updateExperience);
router.delete('/:id', ExperienceController.deleteExperience);

export default router;
