import { Request, Response } from 'express';
import * as ExperienceService from './experience.service';
import { sendSuccess, sendError } from '../../utils/response';

export const getAllExperiences = async (_req: Request, res: Response): Promise<void> => {
  try {
    const experiences = await ExperienceService.getAllExperiences();
    sendSuccess(res, 'Experiences fetched successfully.', experiences);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch experiences.';
    sendError(res, message, 500);
  }
};

export const getExperienceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const experience = await ExperienceService.getExperienceById(req.params.id);
    sendSuccess(res, 'Experience fetched successfully.', experience);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch experience.';
    sendError(res, message, 404);
  }
};

export const createExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const experience = await ExperienceService.createExperience(req.body);
    sendSuccess(res, 'Experience created successfully.', experience, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create experience.';
    sendError(res, message, 400);
  }
};

export const updateExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const experience = await ExperienceService.updateExperience(req.params.id, req.body);
    sendSuccess(res, 'Experience updated successfully.', experience);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update experience.';
    sendError(res, message, 400);
  }
};

export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    await ExperienceService.deleteExperience(req.params.id);
    sendSuccess(res, 'Experience deleted successfully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete experience.';
    sendError(res, message, 400);
  }
};
