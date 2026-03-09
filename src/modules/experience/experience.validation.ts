import { z } from 'zod';
import { ExperienceType } from './experience.model';

// Accept strings but cleanly transform them into Dates if valid
const dateSchema = z.preprocess((arg) => {
  if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  return arg; // Fallback
}, z.date());

const experienceBaseSchema = z.object({
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters').trim(),
  companyName: z.string().min(2, 'Company name is required').trim(),
  companyLink: z.string().url('Must be a valid URL').optional(),
  location: z.string().min(2, 'Location is required').trim(),
  type: z.nativeEnum(ExperienceType).optional(),
  startDate: dateSchema,
  endDate: dateSchema.optional(),
  description: z.string().optional(),
  
  contributions: z.array(z.string()).optional().default([]),
  skills: z.array(z.string()).optional().default([])
});

const validateDates = (data: any) => {
  if (data.endDate && data.startDate) {
    return data.endDate >= data.startDate;
  }
  return true;
};

export const createExperienceSchema = experienceBaseSchema.refine(validateDates, {
  message: "End date cannot be prior to the start date",
  path: ["endDate"]
});

export const updateExperienceSchema = experienceBaseSchema.partial().refine(validateDates, {
  message: "End date cannot be prior to the start date",
  path: ["endDate"]
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;

