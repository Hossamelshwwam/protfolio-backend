import { z } from 'zod';

// ─── Validation Schema ────────────────────────────────────────────────────────
// This schema validates only the text fields sent in the multipart/form-data.
// Files (logo, cv) are validated by Multer's fileFilter.

export const updateProfileSchema = z.object({
  name: z.string().trim().optional(),
  jobTitle: z.string().trim().optional(),
  brief: z.string().trim().optional(),

  // CV is now a Google Drive (or similar) direct link, NOT a file upload
  cvUrl: z.string().url('cvUrl must be a valid URL').optional().or(z.literal('')),

  // Multer parses form-data as strings, even if it's stringified JSON.
  socialLinks: z
    .any()
    .optional()
    .transform((val) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch {
          return {};
        }
      }
      return val;
    }),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
