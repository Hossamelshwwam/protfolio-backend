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
    // Multer parses form-data as strings, even if it's stringified JSON.
    // We accept the raw strings or an object, and allow the controller to parse it.
    socialLinks: zod_1.z
        .any()
        .optional()
        .transform((val) => {
        // If it's a stringified JSON object from FormData, parse it:
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