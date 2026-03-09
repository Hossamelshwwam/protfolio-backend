import Profile, { IProfileDocument } from './profile.model';
import { UpdateProfileInput } from './profile.validation';
import { deleteLocalFile } from '../../utils/file.utils';

// ─── Fetch the active profile ─────────────────────────────────────────────────
export const getProfile = async (): Promise<IProfileDocument> => {
  // Since it's a portfolio, there is only one profile
  let profile = await Profile.findOne({});

  // If no profile exists yet, create an empty skeleton
  if (!profile) {
    profile = await Profile.create({});
  }

  return profile;
};

// ─── Update Profile Data & Files ──────────────────────────────────────────────
export const updateProfile = async (
  data: UpdateProfileInput,
  files?: {
    logo?: Express.Multer.File[];
    cv?: Express.Multer.File[];
  }
): Promise<IProfileDocument> => {
  const profile = await getProfile();

  // 1. Update text fields if provided
  if (data.name !== undefined) profile.name = data.name;
  if (data.jobTitle !== undefined) profile.jobTitle = data.jobTitle;
  if (data.brief !== undefined) profile.brief = data.brief;
  if (data.socialLinks) {
    profile.socialLinks = {
      ...profile.socialLinks,
      ...data.socialLinks,
    };
  }

  // 2. Handle File Uploads (Save relative paths)
  if (files) {
    // Logo upload
    if (files.logo && files.logo.length > 0) {
      if (profile.logoUrl) {
        deleteLocalFile(profile.logoUrl);
      }
      const logoFile = files.logo[0];
      profile.logoUrl = `/uploads/profile/${logoFile.filename}`;
    }

    // CV upload
    if (files.cv && files.cv.length > 0) {
      if (profile.cvUrl) {
        deleteLocalFile(profile.cvUrl);
      }
      const cvFile = files.cv[0];
      profile.cvUrl = `/uploads/profile/${cvFile.filename}`;
    }
  }

  await profile.save();
  return profile;

};
