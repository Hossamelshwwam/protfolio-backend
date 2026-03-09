import Project, { IProjectDocument } from './project.model';
import { CreateProjectInput, UpdateProjectInput } from './project.validation';
import { deleteLocalFile } from '../../utils/file.utils';

export const getAllProjects = async (): Promise<IProjectDocument[]> => {
  return await Project.find({}).sort({ createdAt: -1 });
};

export const getProjectById = async (id: string): Promise<IProjectDocument> => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found.');
  }
  return project;
};

export const createProject = async (
  data: CreateProjectInput,
  files?: {
    mainImage?: Express.Multer.File[];
    images?: Express.Multer.File[];
  }
): Promise<IProjectDocument> => {
  if (!files?.mainImage || files.mainImage.length === 0) {
    throw new Error('mainImage is required to create a project.');
  }

  const payload: Partial<IProjectDocument> = { ...data };

  // Set main cover image
  payload.mainImageUrl = `/uploads/project/${files.mainImage[0].filename}`;

  // Set secondary images array if any provided
  if (files.images && files.images.length > 0) {
    payload.imagesUrls = files.images.map(f => `/uploads/project/${f.filename}`);
  }

  return await Project.create(payload);
};

export const updateProject = async (
  id: string,
  data: UpdateProjectInput,
  files?: {
    mainImage?: Express.Multer.File[];
    images?: Express.Multer.File[];
  }
): Promise<IProjectDocument> => {
  const existingProject = await Project.findById(id);
  if (!existingProject) {
    throw new Error('Project not found.');
  }

  const payload: Partial<IProjectDocument> = { ...data };

  if (files) {
    // Overwrite mainImage
    if (files.mainImage && files.mainImage.length > 0) {
      if (existingProject.mainImageUrl) {
        deleteLocalFile(existingProject.mainImageUrl);
      }
      payload.mainImageUrl = `/uploads/project/${files.mainImage[0].filename}`;
    }

    // Overwrite images array 
    // Usually standard to replace the whole array of secondary images when uploading new ones via form-data.
    if (files.images && files.images.length > 0) {
      if (existingProject.imagesUrls && existingProject.imagesUrls.length > 0) {
        existingProject.imagesUrls.forEach(url => deleteLocalFile(url));
      }
      payload.imagesUrls = files.images.map(f => `/uploads/project/${f.filename}`);
    }
  }

  const updatedProject = await Project.findByIdAndUpdate(id, payload, { new: true });
  return updatedProject as IProjectDocument;
};

export const deleteProject = async (id: string): Promise<void> => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found.');
  }

  // Delete main image
  if (project.mainImageUrl) {
    deleteLocalFile(project.mainImageUrl);
  }

  // Delete secondary images
  if (project.imagesUrls && project.imagesUrls.length > 0) {
    project.imagesUrls.forEach(url => deleteLocalFile(url));
  }

  await Project.findByIdAndDelete(id);
};
