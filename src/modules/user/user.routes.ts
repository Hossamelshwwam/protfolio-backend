import { Router } from 'express';
import * as UserController from './user.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import {
  registerSchema,
  loginSchema,
  updateUserSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './user.validation';
import { UserRole } from '../../types';

const router = Router();

// ─── Auth Routes ──────────────────────────────────────────────────────────────
// POST /api/users/register
router.post('/register', validate(registerSchema), UserController.register);

// POST /api/users/login
router.post('/login', validate(loginSchema), UserController.login);

// POST /api/users/forgot-password
router.post('/forgot-password', validate(forgotPasswordSchema), UserController.forgotPassword);

// POST /api/users/reset-password?token=<rawToken>
router.post('/reset-password', validate(resetPasswordSchema), UserController.resetPassword);

// ─── Profile Routes (Authenticated) ──────────────────────────────────────────
// GET /api/users/me
router.get('/me', authenticate, UserController.getMe);

// PATCH /api/users/me
router.patch('/me', authenticate, validate(updateUserSchema), UserController.updateMe);

// PATCH /api/users/me/change-password
router.patch(
  '/me/change-password',
  authenticate,
  validate(changePasswordSchema),
  UserController.changeMyPassword
);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
// GET /api/users
router.get('/', authenticate, authorize(UserRole.ADMIN), UserController.getAllUsers);

// GET /api/users/:id
router.get('/:id', authenticate, authorize(UserRole.ADMIN), UserController.getUserById);

// PATCH /api/users/:id
router.patch(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  validate(updateUserSchema),
  UserController.updateUser
);

// DELETE /api/users/:id
router.delete('/:id', authenticate, authorize(UserRole.ADMIN), UserController.deleteUser);

export default router;
