import { IProjectDocument } from './project.model';
import { CreateProjectInput, UpdateProjectInput } from './project.validation';
export declare const getAllProjects: () => Promise<IProjectDocument[]>;
export declare const getProjectById: (id: string) => Promise<IProjectDocument>;
export declare const createProject: (data: CreateProjectInput, files?: {
    mainImage?: Express.Multer.File[];
    images?: Express.Multer.File[];
}) => Promise<IProjectDocument>;
export declare const updateProject: (id: string, data: UpdateProjectInput, files?: {
    mainImage?: Express.Multer.File[];
    images?: Express.Multer.File[];
}) => Promise<IProjectDocument>;
export declare const deleteProject: (id: string) => Promise<void>;
//# sourceMappingURL=project.service.d.ts.map