import { z } from 'zod';

// Form-data often sends arrays as a comma-separated string `skills="React,Node"`
// or as multiple parameters with the same name. We parse it explicitly.
const parseStringArray = z.preprocess((arg) => {
  if (typeof arg === 'string') {
    // If it's a comma separated string, split it
    return arg.split(',').map(s => s.trim()).filter(Boolean);
  }
  if (Array.isArray(arg)) {
    return arg;
  }
  return []; // Fallback empty array
}, z.array(z.string()));

export const createProjectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  description: z.string().min(5, 'Description must be at least 5 characters').trim(),
  skills: parseStringArray.optional().default([]),
  
  githubUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  demoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  videoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

// For updates, everything is optional
export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
