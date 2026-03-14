import { Document, Model } from 'mongoose';
export declare enum ExperienceType {
    FULL_TIME = "full-time",
    PART_TIME = "part-time",
    CONTRACT = "contract",
    FREELANCE = "freelance",
    INTERNSHIP = "internship",
    OTHER = "other"
}
export interface IExperience {
    jobTitle: string;
    companyName: string;
    companyLink?: string;
    location: string;
    type: ExperienceType;
    startDate: Date;
    endDate?: Date;
    description?: string;
    contributions: string[];
    skills: string[];
}
export interface IExperienceDocument extends IExperience, Document {
}
declare const Experience: Model<IExperienceDocument>;
export default Experience;
//# sourceMappingURL=experience.model.d.ts.map