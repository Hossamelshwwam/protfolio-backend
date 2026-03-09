import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

// ─── File Filter Config ───────────────────────────────────────────────────────
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
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
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, and Word docs are allowed.'));
  }
};

// ─── Factory for Dynamic Folders ──────────────────────────────────────────────
export const createUploadMiddleware = (folderName: string) => {
  const uploadDir = path.join(__dirname, `../../uploads/${folderName}`);

  // Ensure directory exists dynamically
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${uuidv4()}${ext}`;
      cb(null, uniqueName);
    },
  });

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  });
};

// ─── Intercept Specific Fields ────────────────────────────────────────────────

// Profile files go to /uploads/profile/...
export const uploadProfileFiles = createUploadMiddleware('profile').fields([
  { name: 'logo', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
]);

// Skill logos go to /uploads/skill/...
export const uploadSkillIcon = createUploadMiddleware('skill').single('logo');

// Project files (1 mainImage, up to 10 additional images) go to /uploads/project/...
export const uploadProjectImages = createUploadMiddleware('project').fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

