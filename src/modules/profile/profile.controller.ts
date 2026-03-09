import { Request, Response } from 'express';
import * as ProfileService from './profile.service';
import { sendSuccess, sendError } from '../../utils/response';
import { updateProfileSchema } from './profile.validation';

// ─── Helper: Format Profile URLs ──────────────────────────────────────────────
const formatProfileResponse = (req: Request, profile: any) => {
  const profileJson = profile.toJSON ? profile.toJSON() : profile;
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  // Prepend base URL if the path starts with /uploads/ (relative path)
  if (profileJson.logoUrl && profileJson.logoUrl.startsWith('/uploads/')) {
    profileJson.logoUrl = `${baseUrl}${profileJson.logoUrl}`;
  }
  if (profileJson.cvUrl && profileJson.cvUrl.startsWith('/uploads/')) {
    profileJson.cvUrl = `${baseUrl}${profileJson.cvUrl}`;
  }

  return profileJson;
};

// ─── Get Profile ──────────────────────────────────────────────────────────────
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await ProfileService.getProfile();
    sendSuccess(res, 'Profile fetched successfully.', formatProfileResponse(req, profile));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch profile.';
    sendError(res, message, 500);
  }
};

// ─── Update Profile (Multipart) ───────────────────────────────────────────────
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Zod runtime validation of text fields
    const validatedData = updateProfileSchema.parse(req.body);

    // 2. Extract files
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // 3. Update via Service (stores relative paths)
    const updatedProfile = await ProfileService.updateProfile(
      validatedData,
      files
    );

    sendSuccess(res, 'Profile updated successfully.', formatProfileResponse(req, updatedProfile));
  } catch (error) {
    // If it's a Zod error, format it back
    if (error && typeof error === 'object' && 'errors' in error) {
      sendError(res, 'Validation failed.', 400, (error as any).errors);
      return;
    }

    const message = error instanceof Error ? error.message : 'Failed to update profile.';
    sendError(res, message, 400);
  }
};
