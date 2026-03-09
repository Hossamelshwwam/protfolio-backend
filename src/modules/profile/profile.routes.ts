import { Router } from 'express';
import * as ProfileController from './profile.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { UserRole } from '../../types';
import { uploadProfileFiles } from '../../middleware/upload.middleware';

const router = Router();

// GET /api/profile
// Public endpoint for frontend to fetch the portfolio
router.get('/', ProfileController.getProfile);

// PATCH /api/profile
// Admin-only endpoint. Uses uploadProfileFiles middleware to handle multipart/form-data
router.patch(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  uploadProfileFiles, // Multer intercepts `logo` and `cv` file streams here
  ProfileController.updateProfile
);

export default router;
