import multer from 'multer';
import { Request } from 'express';

// ─── File Filter Config ───────────────────────────────────────────────────────
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images (JPEG, PNG, WebP, SVG) are allowed.'));
  }
};

// ─── Memory Storage (files are kept in RAM, then sent to Cloudinary) ──────────
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// ─── Named Upload Configurators ───────────────────────────────────────────────

// Profile: only the logo image (cv is now a Drive link in req.body)
export const uploadProfileFiles = upload.fields([
  { name: 'logo', maxCount: 1 },
]);

// Skill: single logo image
export const uploadSkillIcon = upload.single('logo');

// Project: cover image + up to 10 additional images
// (videoUrl is now a Drive link in req.body, not a file)
export const uploadProjectImages = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);
