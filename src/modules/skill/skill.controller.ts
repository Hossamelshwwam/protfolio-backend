import { Request, Response } from 'express';
import * as SkillService from './skill.service';
import { sendSuccess, sendError } from '../../utils/response';
import { createSkillSchema, updateSkillSchema } from './skill.validation';

export const getAllSkills = async (_req: Request, res: Response): Promise<void> => {
  try {
    const skills = await SkillService.getAllSkills();
    // Cloudinary URLs are already absolute – return directly
    const skillsJson = skills.map(s => (s.toJSON ? s.toJSON() : s));
    sendSuccess(res, 'Skills fetched successfully.', skillsJson);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch skills.';
    sendError(res, message, 500);
  }
};

export const getSkillById = async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = await SkillService.getSkillById(req.params.id);
    sendSuccess(res, 'Skill fetched successfully.', skill.toJSON ? skill.toJSON() : skill);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch skill.';
    sendError(res, message, 404);
  }
};

export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createSkillSchema.parse(req.body);
    const file = req.file;

    const skill = await SkillService.createSkill(validatedData, file);
    sendSuccess(res, 'Skill created successfully.', skill.toJSON ? skill.toJSON() : skill, 201);
  } catch (error) {
    if (error && typeof error === 'object' && 'errors' in error) {
      sendError(res, 'Validation failed.', 400, (error as any).errors);
      return;
    }
    const message = error instanceof Error ? error.message : 'Failed to create skill.';
    sendError(res, message, 400);
  }
};

export const updateSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = updateSkillSchema.parse(req.body);
    const file = req.file;

    const skill = await SkillService.updateSkill(req.params.id, validatedData, file);
    sendSuccess(res, 'Skill updated successfully.', skill.toJSON ? skill.toJSON() : skill);
  } catch (error) {
    if (error && typeof error === 'object' && 'errors' in error) {
      sendError(res, 'Validation failed.', 400, (error as any).errors);
      return;
    }
    const message = error instanceof Error ? error.message : 'Failed to update skill.';
    sendError(res, message, 400);
  }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    await SkillService.deleteSkill(req.params.id);
    sendSuccess(res, 'Skill deleted successfully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete skill.';
    sendError(res, message, 400);
  }
};
