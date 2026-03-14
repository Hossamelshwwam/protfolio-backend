"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
// ─── Validation Schema ────────────────────────────────────────────────────────
// This schema validates only the text fields sent in the multipart/form-data.
// Files (logo, cv) are validated by Multer's fileFilter.
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().trim().optional(),
    jobTitle: zod_1.z.string().trim().optional(),
    brief: zod_1.z.string().trim().optional(),
    // CV is now a Google Drive (or similar) direct link, NOT a file upload
    cvUrl: zod_1.z.string().url('cvUrl must be a valid URL').optional().or(zod_1.z.literal('')),
    // Multer parses form-data as strings, even if it's stringified JSON.
    socialLinks: zod_1.z
        .any()
        .optional()
        .transform((val) => {
        if (typeof val === 'string') {
            try {
                return JSON.parse(val);
            }
            catch {
                return {};
            }
        }
        return val;
    }),
});
//# sourceMappingURL=profile.validation.js.map