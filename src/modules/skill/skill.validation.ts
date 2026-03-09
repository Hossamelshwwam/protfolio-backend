import { z } from 'zod';
import mongoose from 'mongoose';

// Validation for text fields sent via multipart/form-data
export const createSkillSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').trim(),
  category: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid Category ID format',
  }),
});

export const updateSkillSchema = z.object({
  name: z.string().min(2).trim().optional(),
  category: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid Category ID format',
  }).optional(),
});

export type CreateSkillInput = z.infer<typeof createSkillSchema>;
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;
