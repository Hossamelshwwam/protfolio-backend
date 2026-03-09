import { Router } from 'express';
import * as SkillController from './skill.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { UserRole } from '../../types';
import { uploadSkillIcon } from '../../middleware/upload.middleware';

const router = Router();

// Public Routes
router.get('/', SkillController.getAllSkills);
router.get('/:id', SkillController.getSkillById);

// Admin Only Routes
router.use(authenticate, authorize(UserRole.ADMIN));

// Because these endpoints handle multipart/form-data for image uploads,
// we do NOT use the standard `validate()` middleware here since Zod would 
// run before Multer parses the form-data. 
// Instead, Multer places the fields on req.body, and the Controller validates them.

router.post('/', uploadSkillIcon, SkillController.createSkill);
router.patch('/:id', uploadSkillIcon, SkillController.updateSkill);
router.delete('/:id', SkillController.deleteSkill);

export default router;
