import { z } from 'zod';
import { ExperienceType } from './experience.model';
export declare const createExperienceSchema: z.ZodEffects<z.ZodObject<{
    jobTitle: z.ZodString;
    companyName: z.ZodString;
    companyLink: z.ZodOptional<z.ZodString>;
    location: z.ZodString;
    type: z.ZodOptional<z.ZodNativeEnum<typeof ExperienceType>>;
    startDate: z.ZodEffects<z.ZodDate, Date, unknown>;
    endDate: z.ZodOptional<z.ZodEffects<z.ZodDate, Date, unknown>>;
    description: z.ZodOptional<z.ZodString>;
    contributions: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    skills: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    jobTitle: string;
    companyName: string;
    location: string;
    startDate: Date;
    contributions: string[];
    skills: string[];
    type?: ExperienceType | undefined;
    description?: string | undefined;
    companyLink?: string | undefined;
    endDate?: Date | undefined;
}, {
    jobTitle: string;
    companyName: string;
    location: string;
    type?: ExperienceType | undefined;
    description?: string | undefined;
    companyLink?: string | undefined;
    startDate?: unknown;
    endDate?: unknown;
    contributions?: string[] | undefined;
    skills?: string[] | undefined;
}>, {
    jobTitle: string;
    companyName: string;
    location: string;
    startDate: Date;
    contributions: string[];
    skills: string[];
    type?: ExperienceType | undefined;
    description?: string | undefined;
    companyLink?: string | undefined;
    endDate?: Date | undefined;
}, {
    jobTitle: string;
    companyName: string;
    location: string;
    type?: ExperienceType | undefined;
    description?: string | undefined;
    companyLink?: string | undefined;
    startDate?: unknown;
    endDate?: unknown;
    contributions?: string[] | undefined;
    skills?: string[] | undefined;
}>;
export declare const updateExperienceSchema: z.ZodEffects<z.ZodObject<{
    jobTitle: z.ZodOptional<z.ZodString>;
    companyName: z.ZodOptional<z.ZodString>;
    companyLink: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    location: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodOptional<z.ZodNativeEnum<typeof ExperienceType>>>;
    startDate: z.ZodOptional<z.ZodEffects<z.ZodDate, Date, unknown>>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodDate, Date, unknown>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    contributions: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    skills: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
}, "strip", z.ZodTypeAny, {
    type?: ExperienceType | undefined;
    description?: string | undefined;
    jobTitle?: string | undefined;
    companyName?: string | undefined;
    companyLink?: string | undefined;
    location?: string | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    contributions?: string[] | undefined;
    skills?: string[] | undefined;
}, {
    type?: ExperienceType | undefined;
    description?: string | undefined;
    jobTitle?: string | undefined;
    companyName?: string | undefined;
    companyLink?: string | undefined;
    location?: string | undefined;
    startDate?: unknown;
    endDate?: unknown;
    contributions?: string[] | undefined;
    skills?: string[] | undefined;
}>, {
    type?: ExperienceType | undefined;
    description?: string | undefined;
    jobTitle?: string | undefined;
    companyName?: string | undefined;
    companyLink?: string | undefined;
    location?: string | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    contributions?: string[] | undefined;
    skills?: string[] | undefined;
}, {
    type?: ExperienceType | undefined;
    description?: string | undefined;
    jobTitle?: string | undefined;
    companyName?: string | undefined;
    companyLink?: string | undefined;
    location?: string | undefined;
    startDate?: unknown;
    endDate?: unknown;
    contributions?: string[] | undefined;
    skills?: string[] | undefined;
}>;
export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
//# sourceMappingURL=experience.validation.d.ts.map