import { z } from 'zod';
export declare const createProjectSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    skills: z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], unknown>>>;
    githubUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    demoUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    videoUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    skills: string[];
    githubUrl?: string | undefined;
    demoUrl?: string | undefined;
    videoUrl?: string | undefined;
}, {
    name: string;
    description: string;
    skills?: unknown;
    githubUrl?: string | undefined;
    demoUrl?: string | undefined;
    videoUrl?: string | undefined;
}>;
export declare const updateProjectSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    skills: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], unknown>>>>;
    githubUrl: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    demoUrl: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    videoUrl: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    skills?: string[] | undefined;
    githubUrl?: string | undefined;
    demoUrl?: string | undefined;
    videoUrl?: string | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    skills?: unknown;
    githubUrl?: string | undefined;
    demoUrl?: string | undefined;
    videoUrl?: string | undefined;
}>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
//# sourceMappingURL=project.validation.d.ts.map