"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
// Form-data often sends arrays as a comma-separated string `skills="React,Node"`
// or as multiple parameters with the same name. We parse it explicitly.
const parseStringArray = zod_1.z.preprocess((arg) => {
    if (typeof arg === 'string') {
        // If it's a comma separated string, split it
        return arg.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (Array.isArray(arg)) {
        return arg;
    }
    return []; // Fallback empty array
}, zod_1.z.array(zod_1.z.string()));
exports.createProjectSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters').trim(),
    description: zod_1.z.string().min(5, 'Description must be at least 5 characters').trim(),
    skills: parseStringArray.optional().default([]),
    githubUrl: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
    demoUrl: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
    videoUrl: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
});
// For updates, everything is optional
exports.updateProjectSchema = exports.createProjectSchema.partial();
//# sourceMappingURL=project.validation.js.map