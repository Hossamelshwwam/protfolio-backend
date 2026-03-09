"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const ProfileService = __importStar(require("./profile.service"));
const response_1 = require("../../utils/response");
const profile_validation_1 = require("./profile.validation");
// ─── Helper: Format Profile URLs ──────────────────────────────────────────────
const formatProfileResponse = (req, profile) => {
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
const getProfile = async (req, res) => {
    try {
        const profile = await ProfileService.getProfile();
        (0, response_1.sendSuccess)(res, 'Profile fetched successfully.', formatProfileResponse(req, profile));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch profile.';
        (0, response_1.sendError)(res, message, 500);
    }
};
exports.getProfile = getProfile;
// ─── Update Profile (Multipart) ───────────────────────────────────────────────
const updateProfile = async (req, res) => {
    try {
        // 1. Zod runtime validation of text fields
        const validatedData = profile_validation_1.updateProfileSchema.parse(req.body);
        // 2. Extract files
        const files = req.files;
        // 3. Update via Service (stores relative paths)
        const updatedProfile = await ProfileService.updateProfile(validatedData, files);
        (0, response_1.sendSuccess)(res, 'Profile updated successfully.', formatProfileResponse(req, updatedProfile));
    }
    catch (error) {
        // If it's a Zod error, format it back
        if (error && typeof error === 'object' && 'errors' in error) {
            (0, response_1.sendError)(res, 'Validation failed.', 400, error.errors);
            return;
        }
        const message = error instanceof Error ? error.message : 'Failed to update profile.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=profile.controller.js.map