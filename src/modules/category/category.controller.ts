import { Request, Response } from 'express';
import * as CategoryService from './category.service';
import { sendSuccess, sendError } from '../../utils/response';

export const getAllCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await CategoryService.getAllCategories();
    sendSuccess(res, 'Categories fetched successfully.', categories);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch categories.';
    sendError(res, message, 500);
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    sendSuccess(res, 'Category fetched successfully.', category);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch category.';
    sendError(res, message, 404);
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await CategoryService.createCategory(req.body);
    sendSuccess(res, 'Category created successfully.', category, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create category.';
    sendError(res, message, 400);
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await CategoryService.updateCategory(req.params.id, req.body);
    sendSuccess(res, 'Category updated successfully.', category);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update category.';
    sendError(res, message, 400);
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    await CategoryService.deleteCategory(req.params.id);
    sendSuccess(res, 'Category deleted successfully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete category.';
    sendError(res, message, 400);
  }
};
