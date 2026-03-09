import { z } from "zod";

// Accept strings but cleanly transform them into Dates if valid
const dateSchema = z.preprocess((arg) => {
  if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  return arg; // Fallback
}, z.date());

const educationBaseSchema = z.object({
  degree: z.string().min(2, "Degree must be at least 2 characters").trim(),
  fieldOfStudy: z.string().min(2, "Field of study is required").trim(),
  university: z.string().min(2, "University is required").trim(),
  startDate: dateSchema,
  endDate: dateSchema.optional(),
  city: z.string().min(2, "City is required").trim(),
  country: z.string().min(2, "Country is required").trim(),
  achievements: z.array(z.string()).optional().default([]),
});

const validateDates = (data: any) => {
  if (data.endDate && data.startDate) {
    return data.endDate >= data.startDate;
  }
  return true;
};

export const createEducationSchema = educationBaseSchema.refine(validateDates, {
  message: "End date cannot be prior to the start date",
  path: ["endDate"],
});

export const updateEducationSchema = educationBaseSchema
  .partial()
  .refine(validateDates, {
    message: "End date cannot be prior to the start date",
    path: ["endDate"],
  });

export type CreateEducationInput = z.infer<typeof createEducationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
