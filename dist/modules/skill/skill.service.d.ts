import { ISkillDocument } from './skill.model';
import { CreateSkillInput, UpdateSkillInput } from './skill.validation';
export declare const getAllSkills: () => Promise<ISkillDocument[]>;
export declare const getSkillById: (id: string) => Promise<ISkillDocument>;
export declare const createSkill: (data: CreateSkillInput, file?: Express.Multer.File) => Promise<ISkillDocument>;
export declare const updateSkill: (id: string, data: UpdateSkillInput, file?: Express.Multer.File) => Promise<ISkillDocument>;
export declare const deleteSkill: (id: string) => Promise<void>;
//# sourceMappingURL=skill.service.d.ts.map