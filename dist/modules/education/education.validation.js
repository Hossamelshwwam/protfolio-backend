"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEducationSchema = exports.createEducationSchema = void 0;
const zod_1 = require("zod");
// Accept strings but cleanly transform them into Dates if valid
const dateSchema = zod_1.z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date)
        return new Date(arg);
    return arg; // Fallback
}, zod_1.z.date());
const educationBaseSchema = zod_1.z.object({
    degree: zod_1.z.string().min(2, "Degree must be at least 2 characters").trim(),
    fieldOfStudy: zod_1.z.string().min(2, "Field of study is required").trim(),
    university: zod_1.z.string().min(2, "University is required").trim(),
    startDate: dateSchema,
    endDate: dateSchema.optional(),
    city: zod_1.z.string().min(2, "City is required").trim(),
    country: zod_1.z.string().min(2, "Country is required").trim(),
    achievements: zod_1.z.array(zod_1.z.string()).optional().default([]),
});
const validateDates = (data) => {
    if (data.endDate && data.startDate) {
        return data.endDate >= data.startDate;
    }
    return true;
};
exports.createEducationSchema = educationBaseSchema.refine(validateDates, {
    message: "End date cannot be prior to the start date",
    path: ["endDate"],
});
exports.updateEducationSchema = educationBaseSchema
    .partial()
    .refine(validateDates, {
    message: "End date cannot be prior to the start date",
    path: ["endDate"],
});
//# sourceMappingURL=education.validation.js.map