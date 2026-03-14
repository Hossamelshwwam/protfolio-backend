import { Document, Model } from 'mongoose';
import { ICategoryDocument } from '../category/category.model';
export interface ISkill {
    name: string;
    logoUrl?: string;
    category: string | ICategoryDocument;
}
export interface ISkillDocument extends ISkill, Document {
}
declare const Skill: Model<ISkillDocument>;
export default Skill;
//# sourceMappingURL=skill.model.d.ts.map