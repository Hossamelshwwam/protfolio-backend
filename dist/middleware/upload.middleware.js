"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProjectImages = exports.uploadSkillIcon = exports.uploadProfileFiles = exports.createUploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
// ─── File Filter Config ───────────────────────────────────────────────────────
const fileFilter = (_req, file, cb) => {
    // Allow common image and document formats
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/svg+xml',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type. Only images, PDFs, and Word docs are allowed.'));
    }
};
// ─── Factory for Dynamic Folders ──────────────────────────────────────────────
const createUploadMiddleware = (folderName) => {
    const uploadDir = path_1.default.join(__dirname, `../../uploads/${folderName}`);
    // Ensure directory exists dynamically
    if (!fs_1.default.existsSync(uploadDir)) {
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
    }
    const storage = multer_1.default.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, uploadDir);
        },
        filename: (_req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            const uniqueName = `${(0, uuid_1.v4)()}${ext}`;
            cb(null, uniqueName);
        },
    });
    return (0, multer_1.default)({
        storage,
        fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    });
};
exports.createUploadMiddleware = createUploadMiddleware;
// ─── Intercept Specific Fields ────────────────────────────────────────────────
// Profile files go to /uploads/profile/...
exports.uploadProfileFiles = (0, exports.createUploadMiddleware)('profile').fields([
    { name: 'logo', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
]);
// Skill logos go to /uploads/skill/...
exports.uploadSkillIcon = (0, exports.createUploadMiddleware)('skill').single('logo');
// Project files (1 mainImage, up to 10 additional images) go to /uploads/project/...
exports.uploadProjectImages = (0, exports.createUploadMiddleware)('project').fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]);
//# sourceMappingURL=upload.middleware.js.map