import { IEducationDocument } from "./education.model";
import { CreateEducationInput, UpdateEducationInput } from "./education.validation";
export declare const getAllEducations: () => Promise<IEducationDocument[]>;
export declare const getEducationById: (id: string) => Promise<IEducationDocument>;
export declare const createEducation: (data: CreateEducationInput) => Promise<IEducationDocument>;
export declare const updateEducation: (id: string, data: UpdateEducationInput) => Promise<IEducationDocument>;
export declare const deleteEducation: (id: string) => Promise<void>;
//# sourceMappingURL=education.service.d.ts.map