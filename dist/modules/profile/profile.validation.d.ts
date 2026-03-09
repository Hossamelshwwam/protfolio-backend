import { z } from 'zod';
export declare const updateProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    brief: z.ZodOptional<z.ZodString>;
    socialLinks: z.ZodEffects<z.ZodOptional<z.ZodAny>, any, any>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    jobTitle?: string | undefined;
    brief?: string | undefined;
    socialLinks?: any;
}, {
    name?: string | undefined;
    jobTitle?: string | undefined;
    brief?: string | undefined;
    socialLinks?: any;
}>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
//# sourceMappingURL=profile.validation.d.ts.map