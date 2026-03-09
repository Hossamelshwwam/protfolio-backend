import { Document, Model } from 'mongoose';
export interface IProject {
    name: string;
    description: string;
    skills: string[];
    githubUrl?: string;
    demoUrl?: string;
    videoUrl?: string;
    mainImageUrl: string;
    imagesUrls: string[];
}
export interface IProjectDocument extends IProject, Document {
}
declare const Project: Model<IProjectDocument>;
export default Project;
//# sourceMappingURL=project.model.d.ts.map