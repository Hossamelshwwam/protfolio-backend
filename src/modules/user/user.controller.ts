import { Request, Response } from 'express';
import * as UserService from './user.service';
import { sendSuccess, sendError } from '../../utils/response';
import { AuthRequest } from '../../types';

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await UserService.registerUser(req.body);
    sendSuccess(res, 'Account created successfully.', result, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed.';
    sendError(res, message, 400);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await UserService.loginUser(req.body);
    sendSuccess(res, 'Login successful.', result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed.';
    sendError(res, message, 401);
  }
};

// ─── Profile ──────────────────────────────────────────────────────────────────

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await UserService.getUserById(req.user!.userId);
    sendSuccess(res, 'Profile fetched successfully.', user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch profile.';
    sendError(res, message, 404);
  }
};

export const updateMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await UserService.updateUser(req.user!.userId, req.body);
    sendSuccess(res, 'Profile updated successfully.', user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Update failed.';
    sendError(res, message, 400);
  }
};

export const changeMyPassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await UserService.changePassword(req.user!.userId, req.body);
    sendSuccess(res, 'Password changed successfully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Password change failed.';
    sendError(res, message, 400);
  }
};

// ─── Admin ────────────────────────────────────────────────────────────────────

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();
    sendSuccess(res, 'Users fetched successfully.', users);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch users.';
    sendError(res, message, 500);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.getUserById(req.params.id);
    sendSuccess(res, 'User fetched successfully.', user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'User not found.';
    sendError(res, message, 404);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    sendSuccess(res, 'User updated successfully.', user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Update failed.';
    sendError(res, message, 400);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await UserService.deleteUser(req.params.id);
    sendSuccess(res, 'User deleted successfully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Delete failed.';
    sendError(res, message, 400);
  }
};

// ─── Forgot Password ──────────────────────────────────────────────────────────

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    await UserService.forgotPassword(req.body);
    // Always return the same message — don't leak whether the email exists
    sendSuccess(res, 'If that email is registered, a reset link has been sent.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong.';
    sendError(res, message, 500);
  }
};

// ─── Reset Password ───────────────────────────────────────────────────────────

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.query.token as string;

    if (!token) {
      sendError(res, 'Reset token is missing from the request.', 400);
      return;
    }

    await UserService.resetPassword(token, req.body);
    sendSuccess(res, 'Password has been reset successfully. You can now log in.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Password reset failed.';
    sendError(res, message, 400);
  }
};

