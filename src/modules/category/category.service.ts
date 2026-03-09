import Category, { ICategoryDocument } from './category.model';
import { CreateCategoryInput, UpdateCategoryInput } from './category.validation';

export const getAllCategories = async (): Promise<ICategoryDocument[]> => {
  return await Category.find({}).sort({ createdAt: -1 });
};

export const getCategoryById = async (id: string): Promise<ICategoryDocument> => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found.');
  }
  return category;
};

export const createCategory = async (data: CreateCategoryInput): Promise<ICategoryDocument> => {
  const existing = await Category.findOne({ name: data.name });
  if (existing) {
    throw new Error('Category with this name already exists.');
  }
  return await Category.create(data);
};

export const updateCategory = async (id: string, data: UpdateCategoryInput): Promise<ICategoryDocument> => {
  if (data.name) {
    const existing = await Category.findOne({ name: data.name, _id: { $ne: id } });
    if (existing) {
      throw new Error('Another category with this name already exists.');
    }
  }

  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!category) {
    throw new Error('Category not found.');
  }

  return category;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new Error('Category not found.');
  }
};
