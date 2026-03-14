import { z } from 'zod';
export declare const updateProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    jobTitle: z.ZodOptional<z.ZodString>;
    brief: z.ZodOptional<z.ZodString>;
    cvUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    socialLinks: z.ZodEffects<z.ZodOptional<z.ZodAny>, any, any>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    jobTitle?: string | undefined;
    brief?: string | undefined;
    socialLinks?: any;
    cvUrl?: string | undefined;
}, {
    name?: string | undefined;
    jobTitle?: string | undefined;
    brief?: string | undefined;
    socialLinks?: any;
    cvUrl?: string | undefined;
}>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
//# sourceMappingURL=profile.validation.d.ts.map