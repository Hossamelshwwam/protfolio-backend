import { Request, Response } from 'express';
import * as ProfileService from './profile.service';
import { sendSuccess, sendError } from '../../utils/response';
import { updateProfileSchema } from './profile.validation';

// ─── Get Profile ──────────────────────────────────────────────────────────────
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await ProfileService.getProfile();
    // Cloudinary URLs are already full URLs – no need to prefix
    const profileJson = profile.toJSON ? profile.toJSON() : profile;
    sendSuccess(res, 'Profile fetched successfully.', profileJson);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch profile.';
    sendError(res, message, 500);
  }
};

// ─── Update Profile (Multipart) ───────────────────────────────────────────────
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Zod runtime validation of text fields (including cvUrl as a Drive link)
    const validatedData = updateProfileSchema.parse(req.body);

    // 2. Extract only the logo file (cv is now a body string)
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // 3. Update via Service – uploads logo to Cloudinary
    const updatedProfile = await ProfileService.updateProfile(validatedData, files);

    const profileJson = updatedProfile.toJSON ? updatedProfile.toJSON() : updatedProfile;
    sendSuccess(res, 'Profile updated successfully.', profileJson);
  } catch (error) {
    if (error && typeof error === 'object' && 'errors' in error) {
      sendError(res, 'Validation failed.', 400, (error as any).errors);
      return;
    }
    const message = error instanceof Error ? error.message : 'Failed to update profile.';
    sendError(res, message, 400);
  }
};
