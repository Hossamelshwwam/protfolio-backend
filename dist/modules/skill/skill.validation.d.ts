import { z } from 'zod';
export declare const createSkillSchema: z.ZodObject<{
    name: z.ZodString;
    category: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    name: string;
    category: string;
}, {
    name: string;
    category: string;
}>;
export declare const updateSkillSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    category?: string | undefined;
}, {
    name?: string | undefined;
    category?: string | undefined;
}>;
export type CreateSkillInput = z.infer<typeof createSkillSchema>;
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;
//# sourceMappingURL=skill.validation.d.ts.map