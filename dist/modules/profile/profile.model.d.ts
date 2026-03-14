import { Document, Model } from 'mongoose';
export interface ISocialLinks {
    linkedin?: string;
    github?: string;
    whatsapp?: string;
    facebook?: string;
    phone?: string;
    email?: string;
}
export interface IProfile {
    name?: string;
    jobTitle?: string;
    brief?: string;
    socialLinks?: ISocialLinks;
    logoUrl?: string;
    cvUrl?: string;
}
export interface IProfileDocument extends IProfile, Document {
}
declare const Profile: Model<IProfileDocument>;
export default Profile;
//# sourceMappingURL=profile.model.d.ts.map