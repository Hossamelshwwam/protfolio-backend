import { z } from 'zod';
import { CategoryType } from './category.model';
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodOptional<z.ZodNativeEnum<typeof CategoryType>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type?: CategoryType | undefined;
}, {
    name: string;
    type?: CategoryType | undefined;
}>;
export declare const updateCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodNativeEnum<typeof CategoryType>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    type?: CategoryType | undefined;
}, {
    name?: string | undefined;
    type?: CategoryType | undefined;
}>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
//# sourceMappingURL=category.validation.d.ts.map