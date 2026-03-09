import { z } from 'zod';
import { CategoryType } from './category.model';

export const createCategorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').trim(),
  type: z.nativeEnum(CategoryType).optional()
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).trim().optional(),
  type: z.nativeEnum(CategoryType).optional()
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
