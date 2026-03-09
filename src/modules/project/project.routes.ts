import { Router } from 'express';
import * as ProjectController from './project.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { UserRole } from '../../types';
import { uploadProjectImages } from '../../middleware/upload.middleware';

const router = Router();

// Public Routes
router.get('/', ProjectController.getAllProjects);
router.get('/:id', ProjectController.getProjectById);

// Admin Only Routes
router.use(authenticate, authorize(UserRole.ADMIN));

// We don't use validate(createProjectSchema) middleware directly here
// because the payload is multipart/form-data. Zod validation happens 
// inside the controller after Multer parses the fields.
router.post('/', uploadProjectImages, ProjectController.createProject);
router.patch('/:id', uploadProjectImages, ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

export default router;
