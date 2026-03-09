import { IExperienceDocument } from './experience.model';
import { CreateExperienceInput, UpdateExperienceInput } from './experience.validation';
export declare const getAllExperiences: () => Promise<IExperienceDocument[]>;
export declare const getExperienceById: (id: string) => Promise<IExperienceDocument>;
export declare const createExperience: (data: CreateExperienceInput) => Promise<IExperienceDocument>;
export declare const updateExperience: (id: string, data: UpdateExperienceInput) => Promise<IExperienceDocument>;
export declare const deleteExperience: (id: string) => Promise<void>;
//# sourceMappingURL=experience.service.d.ts.map