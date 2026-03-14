import { Document, Model } from "mongoose";
export interface IEducation {
    degree: string;
    fieldOfStudy: string;
    university: string;
    startDate: Date;
    endDate?: Date;
    city: string;
    country: string;
    achievements: string[];
}
export interface IEducationDocument extends IEducation, Document {
}
declare const Education: Model<IEducationDocument>;
export default Education;
//# sourceMappingURL=education.model.d.ts.map