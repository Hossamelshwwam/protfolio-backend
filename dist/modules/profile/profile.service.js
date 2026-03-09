"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const profile_model_1 = __importDefault(require("./profile.model"));
const file_utils_1 = require("../../utils/file.utils");
// ─── Fetch the active profile ─────────────────────────────────────────────────
const getProfile = async () => {
    // Since it's a portfolio, there is only one profile
    let profile = await profile_model_1.default.findOne({});
    // If no profile exists yet, create an empty skeleton
    if (!profile) {
        profile = await profile_model_1.default.create({});
    }
    return profile;
};
exports.getProfile = getProfile;
// ─── Update Profile Data & Files ──────────────────────────────────────────────
const updateProfile = async (data, files) => {
    const profile = await (0, exports.getProfile)();
    // 1. Update text fields if provided
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
    // 2. Handle File Uploads (Save relative paths)
    if (files) {
        // Logo upload
        if (files.logo && files.logo.length > 0) {
            if (profile.logoUrl) {
                (0, file_utils_1.deleteLocalFile)(profile.logoUrl);
            }
            const logoFile = files.logo[0];
            profile.logoUrl = `/uploads/profile/${logoFile.filename}`;
        }
        // CV upload
        if (files.cv && files.cv.length > 0) {
            if (profile.cvUrl) {
                (0, file_utils_1.deleteLocalFile)(profile.cvUrl);
            }
            const cvFile = files.cv[0];
            profile.cvUrl = `/uploads/profile/${cvFile.filename}`;
        }
    }
    await profile.save();
    return profile;
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=profile.service.js.map