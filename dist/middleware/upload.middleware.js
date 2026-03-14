"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProjectImages = exports.uploadSkillIcon = exports.uploadProfileFiles = void 0;
const multer_1 = __importDefault(require("multer"));
// ─── File Filter Config ───────────────────────────────────────────────────────
const fileFilter = (_req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/svg+xml',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type. Only images (JPEG, PNG, WebP, SVG) are allowed.'));
    }
};
// ─── Memory Storage (files are kept in RAM, then sent to Cloudinary) ──────────
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});
// ─── Named Upload Configurators ───────────────────────────────────────────────
// Profile: only the logo image (cv is now a Drive link in req.body)
exports.uploadProfileFiles = upload.fields([
    { name: 'logo', maxCount: 1 },
]);
// Skill: single logo image
exports.uploadSkillIcon = upload.single('logo');
// Project: cover image + up to 10 additional images
// (videoUrl is now a Drive link in req.body, not a file)
exports.uploadProjectImages = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
]);
//# sourceMappingURL=upload.middleware.js.map