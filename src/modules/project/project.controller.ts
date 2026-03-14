import { Request, Response } from 'express';
import * as ProjectService from './project.service';
import { sendSuccess, sendError } from '../../utils/response';
import { createProjectSchema, updateProjectSchema } from './project.validation';

// Cloudinary URLs are already full/absolute – no transformation needed
const toJson = (project: any) => (project.toJSON ? project.toJSON() : project);

export const getAllProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await ProjectService.getAllProjects();
    sendSuccess(res, 'Projects fetched successfully.', projects.map(toJson));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch projects.';
    sendError(res, message, 500);
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await ProjectService.getProjectById(req.params.id);
    sendSuccess(res, 'Project fetched successfully.', toJson(project));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch project.';
    sendError(res, message, 404);
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    // Zod validation – videoUrl is validated here as a plain URL string
    const validatedData = createProjectSchema.parse(req.body);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    const project = await ProjectService.createProject(validatedData, files);
    sendSuccess(res, 'Project created successfully.', toJson(project), 201);
  } catch (error) {
    if (error && typeof error === 'object' && 'errors' in error) {
      sendError(res, 'Validation failed.', 400, (error as any).errors);
      return;
    }
    const message = error instanceof Error ? error.message : 'Failed to create project.';
    sendError(res, message, 400);
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = updateProjectSchema.parse(req.body);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    const project = await ProjectService.updateProject(req.params.id, validatedData, files);
    sendSuccess(res, 'Project updated successfully.', toJson(project));
  } catch (error) {
    if (error && typeof error === 'object' && 'errors' in error) {
      sendError(res, 'Validation failed.', 400, (error as any).errors);
      return;
    }
    const message = error instanceof Error ? error.message : 'Failed to update project.';
    sendError(res, message, 400);
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    await ProjectService.deleteProject(req.params.id);
    sendSuccess(res, 'Project deleted successfully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete project.';
    sendError(res, message, 400);
  }
};
