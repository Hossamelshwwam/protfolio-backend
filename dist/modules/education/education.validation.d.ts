import { z } from "zod";
export declare const createEducationSchema: z.ZodEffects<z.ZodObject<{
    degree: z.ZodString;
    fieldOfStudy: z.ZodString;
    university: z.ZodString;
    startDate: z.ZodEffects<z.ZodDate, Date, unknown>;
    endDate: z.ZodOptional<z.ZodEffects<z.ZodDate, Date, unknown>>;
    city: z.ZodString;
    country: z.ZodString;
    achievements: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    startDate: Date;
    degree: string;
    fieldOfStudy: string;
    university: string;
    city: string;
    country: string;
    achievements: string[];
    endDate?: Date | undefined;
}, {
    degree: string;
    fieldOfStudy: string;
    university: string;
    city: string;
    country: string;
    startDate?: unknown;
    endDate?: unknown;
    achievements?: string[] | undefined;
}>, {
    startDate: Date;
    degree: string;
    fieldOfStudy: string;
    university: string;
    city: string;
    country: string;
    achievements: string[];
    endDate?: Date | undefined;
}, {
    degree: string;
    fieldOfStudy: string;
    university: string;
    city: string;
    country: string;
    startDate?: unknown;
    endDate?: unknown;
    achievements?: string[] | undefined;
}>;
export declare const updateEducationSchema: z.ZodEffects<z.ZodObject<{
    degree: z.ZodOptional<z.ZodString>;
    fieldOfStudy: z.ZodOptional<z.ZodString>;
    university: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodEffects<z.ZodDate, Date, unknown>>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodDate, Date, unknown>>>;
    city: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    achievements: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
}, "strip", z.ZodTypeAny, {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    degree?: string | undefined;
    fieldOfStudy?: string | undefined;
    university?: string | undefined;
    city?: string | undefined;
    country?: string | undefined;
    achievements?: string[] | undefined;
}, {
    startDate?: unknown;
    endDate?: unknown;
    degree?: string | undefined;
    fieldOfStudy?: string | undefined;
    university?: string | undefined;
    city?: string | undefined;
    country?: string | undefined;
    achievements?: string[] | undefined;
}>, {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    degree?: string | undefined;
    fieldOfStudy?: string | undefined;
    university?: string | undefined;
    city?: string | undefined;
    country?: string | undefined;
    achievements?: string[] | undefined;
}, {
    startDate?: unknown;
    endDate?: unknown;
    degree?: string | undefined;
    fieldOfStudy?: string | undefined;
    university?: string | undefined;
    city?: string | undefined;
    country?: string | undefined;
    achievements?: string[] | undefined;
}>;
export type CreateEducationInput = z.infer<typeof createEducationSchema>;
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;
//# sourceMappingURL=education.validation.d.ts.map