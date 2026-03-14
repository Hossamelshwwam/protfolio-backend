"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
/**
 * Upload a file buffer to Cloudinary.
 * @param buffer  - The file buffer (from multer memoryStorage)
 * @param folder  - The Cloudinary folder (e.g. "portfolio/profile")
 * @param publicId - Optional custom public_id (without extension)
 * @returns The secure URL of the uploaded asset
 */
const uploadToCloudinary = (buffer, folder, publicId) => {
    return new Promise((resolve, reject) => {
        const uploadOptions = { folder };
        if (publicId)
            uploadOptions.public_id = publicId;
        const stream = cloudinary_1.default.uploader.upload_stream(uploadOptions, (error, result) => {
            if (error || !result) {
                return reject(error ?? new Error('Cloudinary upload failed.'));
            }
            resolve(result);
        });
        stream.end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
/**
 * Delete an asset from Cloudinary by its URL.
 * Extracts the public_id from the URL automatically.
 */
const deleteFromCloudinary = async (url) => {
    try {
        // Extract the public_id from a Cloudinary URL
        // Example URL: https://res.cloudinary.com/<cloud>/image/upload/v1234/portfolio/profile/abc.jpg
        const parts = url.split('/');
        const uploadIndex = parts.indexOf('upload');
        if (uploadIndex === -1)
            return;
        // Skip the version segment (v1234) if present
        let pathParts = parts.slice(uploadIndex + 1);
        if (pathParts[0]?.startsWith('v') && !isNaN(Number(pathParts[0].slice(1)))) {
            pathParts = pathParts.slice(1);
        }
        // Join and strip the file extension to get public_id
        const publicIdWithExt = pathParts.join('/');
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');
        await cloudinary_1.default.uploader.destroy(publicId);
    }
    catch {
        // Non-critical – log silently
        console.warn('Could not delete Cloudinary asset:', url);
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
//# sourceMappingURL=cloudinary.utils.js.map