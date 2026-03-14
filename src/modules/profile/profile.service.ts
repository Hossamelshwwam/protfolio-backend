import Profile, { IProfileDocument } from './profile.model';
import { UpdateProfileInput } from './profile.validation';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinary.utils';

// ─── Fetch the active profile ─────────────────────────────────────────────────
export const getProfile = async (): Promise<IProfileDocument> => {
  let profile = await Profile.findOne({});
  if (!profile) {
    profile = await Profile.create({});
  }
  return profile;
};

// ─── Update Profile Data & Files ──────────────────────────────────────────────
export const updateProfile = async (
  data: UpdateProfileInput,
  files?: { logo?: Express.Multer.File[] }
): Promise<IProfileDocument> => {
  const profile = await getProfile();

  // 1. Update text fields
  if (data.name !== undefined) profile.name = data.name;
  if (data.jobTitle !== undefined) profile.jobTitle = data.jobTitle;
  if (data.brief !== undefined) profile.brief = data.brief;
  if (data.socialLinks) {
    profile.socialLinks = {
      ...profile.socialLinks,
      ...data.socialLinks,
    };
  }

  // 2. cvUrl comes as a plain string (Drive link) from req.body
  if (data.cvUrl !== undefined) {
    profile.cvUrl = data.cvUrl;
  }

  // 3. Upload logo to Cloudinary if provided
  if (files?.logo && files.logo.length > 0) {
    // Remove old logo from Cloudinary
    if (profile.logoUrl) {
      await deleteFromCloudinary(profile.logoUrl);
    }
    const result = await uploadToCloudinary(files.logo[0].buffer, 'portfolio/profile');
    profile.logoUrl = result.secure_url;
  }

  await profile.save();
  return profile;
};
