import { z } from 'zod';

// ─── Validation Schema ────────────────────────────────────────────────────────
// This schema validates only the text fields sent in the multipart/form-data.
// Files (logo, cv) are validated by Multer's fileFilter.

export const updateProfileSchema = z.object({
  name: z.string().trim().optional(),
  jobTitle: z.string().trim().optional(),
  brief: z.string().trim().optional(),

  // Multer parses form-data as strings, even if it's stringified JSON.
  // We accept the raw strings or an object, and allow the controller to parse it.
  socialLinks: z
    .any()
    .optional()
    .transform((val) => {
      // If it's a stringified JSON object from FormData, parse it:
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
