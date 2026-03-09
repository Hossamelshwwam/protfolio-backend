"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExperienceSchema = exports.createExperienceSchema = void 0;
const zod_1 = require("zod");
const experience_model_1 = require("./experience.model");
// Accept strings but cleanly transform them into Dates if valid
const dateSchema = zod_1.z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date)
        return new Date(arg);
    return arg; // Fallback
}, zod_1.z.date());
const experienceBaseSchema = zod_1.z.object({
    jobTitle: zod_1.z.string().min(2, 'Job title must be at least 2 characters').trim(),
    companyName: zod_1.z.string().min(2, 'Company name is required').trim(),
    companyLink: zod_1.z.string().url('Must be a valid URL').optional(),
    location: zod_1.z.string().min(2, 'Location is required').trim(),
    type: zod_1.z.nativeEnum(experience_model_1.ExperienceType).optional(),
    startDate: dateSchema,
    endDate: dateSchema.optional(),
    description: zod_1.z.string().optional(),
    contributions: zod_1.z.array(zod_1.z.string()).optional().default([]),
    skills: zod_1.z.array(zod_1.z.string()).optional().default([])
});
const validateDates = (data) => {
    if (data.endDate && data.startDate) {
        return data.endDate >= data.startDate;
    }
    return true;
};
exports.createExperienceSchema = experienceBaseSchema.refine(validateDates, {
    message: "End date cannot be prior to the start date",
    path: ["endDate"]
});
exports.updateExperienceSchema = experienceBaseSchema.partial().refine(validateDates, {
    message: "End date cannot be prior to the start date",
    path: ["endDate"]
});
//# sourceMappingURL=experience.validation.js.map