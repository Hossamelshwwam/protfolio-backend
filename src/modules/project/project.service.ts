import Project, { IProjectDocument } from './project.model';
import { CreateProjectInput, UpdateProjectInput } from './project.validation';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinary.utils';

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

  // Upload main cover image to Cloudinary
  const mainResult = await uploadToCloudinary(
    files.mainImage[0].buffer,
    'portfolio/project'
  );
  payload.mainImageUrl = mainResult.secure_url;

  // Upload additional images if provided
  if (files.images && files.images.length > 0) {
    const uploadPromises = files.images.map(f =>
      uploadToCloudinary(f.buffer, 'portfolio/project')
    );
    const results = await Promise.all(uploadPromises);
    payload.imagesUrls = results.map(r => r.secure_url);
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
    // Replace main image
    if (files.mainImage && files.mainImage.length > 0) {
      if (existingProject.mainImageUrl) {
        await deleteFromCloudinary(existingProject.mainImageUrl);
      }
      const result = await uploadToCloudinary(
        files.mainImage[0].buffer,
        'portfolio/project'
      );
      payload.mainImageUrl = result.secure_url;
    }

    // Replace secondary images array
    if (files.images && files.images.length > 0) {
      if (existingProject.imagesUrls && existingProject.imagesUrls.length > 0) {
        await Promise.all(existingProject.imagesUrls.map(url => deleteFromCloudinary(url)));
      }
      const uploadPromises = files.images.map(f =>
        uploadToCloudinary(f.buffer, 'portfolio/project')
      );
      const results = await Promise.all(uploadPromises);
      payload.imagesUrls = results.map(r => r.secure_url);
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

  if (project.mainImageUrl) {
    await deleteFromCloudinary(project.mainImageUrl);
  }

  if (project.imagesUrls && project.imagesUrls.length > 0) {
    await Promise.all(project.imagesUrls.map(url => deleteFromCloudinary(url)));
  }

  await Project.findByIdAndDelete(id);
};
