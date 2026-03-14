"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const profile_model_1 = __importDefault(require("./profile.model"));
const cloudinary_utils_1 = require("../../utils/cloudinary.utils");
// ─── Fetch the active profile ─────────────────────────────────────────────────
const getProfile = async () => {
    let profile = await profile_model_1.default.findOne({});
    if (!profile) {
        profile = await profile_model_1.default.create({});
    }
    return profile;
};
exports.getProfile = getProfile;
// ─── Update Profile Data & Files ──────────────────────────────────────────────
const updateProfile = async (data, files) => {
    const profile = await (0, exports.getProfile)();
    // 1. Update text fields
    if (data.name !== undefined)
        profile.name = data.name;
    if (data.jobTitle !== undefined)
        profile.jobTitle = data.jobTitle;
    if (data.brief !== undefined)
        profile.brief = data.brief;
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
            await (0, cloudinary_utils_1.deleteFromCloudinary)(profile.logoUrl);
        }
        const result = await (0, cloudinary_utils_1.uploadToCloudinary)(files.logo[0].buffer, 'portfolio/profile');
        profile.logoUrl = result.secure_url;
    }
    await profile.save();
    return profile;
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=profile.service.js.map