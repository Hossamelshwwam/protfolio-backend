import { Request, Response } from 'express';
import * as ProjectService from './project.service';
import { sendSuccess, sendError } from '../../utils/response';
import { createProjectSchema, updateProjectSchema } from './project.validation';

// Helper to format dynamic URLs so clients receive full links
const formatProjectResponse = (req: Request, project: any) => {
  const json = project.toJSON ? project.toJSON() : project;
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  if (json.mainImageUrl && json.mainImageUrl.startsWith('/uploads/')) {
    json.mainImageUrl = `${baseUrl}${json.mainImageUrl}`;
  }

  if (json.imagesUrls && Array.isArray(json.imagesUrls)) {
    json.imagesUrls = json.imagesUrls.map((url: string) => {
      if (url.startsWith('/uploads/')) return `${baseUrl}${url}`;
      return url;
    });
  }

  return json;
};

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await ProjectService.getAllProjects();
    const formatted = projects.map(p => formatProjectResponse(req, p));
    sendSuccess(res, 'Projects fetched successfully.', formatted);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch projects.';
    sendError(res, message, 500);
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await ProjectService.getProjectById(req.params.id);
    sendSuccess(res, 'Project fetched successfully.', formatProjectResponse(req, project));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch project.';
    sendError(res, message, 404);
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Zod runtime validation
    // (This handles mapping a comma separated string sequence to a string[] for skills!)
    const validatedData = createProjectSchema.parse(req.body);

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    const project = await ProjectService.createProject(validatedData, files);
    sendSuccess(res, 'Project created successfully.', formatProjectResponse(req, project), 201);
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
    sendSuccess(res, 'Project updated successfully.', formatProjectResponse(req, project));
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
