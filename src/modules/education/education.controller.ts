import { Request, Response } from "express";
import * as EducationService from "./education.service";
import { sendSuccess, sendError } from "../../utils/response";

export const getAllEducations = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const educations = await EducationService.getAllEducations();
    sendSuccess(res, "Education records fetched successfully.", educations);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch education records.";
    sendError(res, message, 500);
  }
};

export const getEducationById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const education = await EducationService.getEducationById(req.params.id);
    sendSuccess(res, "Education record fetched successfully.", education);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch education record.";
    sendError(res, message, 404);
  }
};

export const createEducation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const education = await EducationService.createEducation(req.body);
    sendSuccess(res, "Education record created successfully.", education, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create education record.";
    sendError(res, message, 400);
  }
};

export const updateEducation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const education = await EducationService.updateEducation(
      req.params.id,
      req.body,
    );
    sendSuccess(res, "Education record updated successfully.", education);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update education record.";
    sendError(res, message, 400);
  }
};

export const deleteEducation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await EducationService.deleteEducation(req.params.id);
    sendSuccess(res, "Education record deleted successfully.");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete education record.";
    sendError(res, message, 400);
  }
};
