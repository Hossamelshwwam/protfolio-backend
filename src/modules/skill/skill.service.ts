import Skill, { ISkillDocument } from './skill.model';
import Category from '../category/category.model';
import { CreateSkillInput, UpdateSkillInput } from './skill.validation';
import { deleteLocalFile } from '../../utils/file.utils';

export const getAllSkills = async (): Promise<ISkillDocument[]> => {
  return await Skill.find({}).populate('category').sort({ createdAt: -1 });
};

export const getSkillById = async (id: string): Promise<ISkillDocument> => {
  const skill = await Skill.findById(id).populate('category');
  if (!skill) {
    throw new Error('Skill not found.');
  }
  return skill;
};

export const createSkill = async (
  data: CreateSkillInput,
  file?: Express.Multer.File
): Promise<ISkillDocument> => {
  // Ensure the referenced category exists
  const categoryExists = await Category.findById(data.category);
  if (!categoryExists) {
    throw new Error('The referenced Category does not exist.');
  }

  const payload: Partial<ISkillDocument> = { ...data };

  // Attach logo file path if uploaded
  if (file) {
    payload.logoUrl = `/uploads/skill/${file.filename}`;
  }

  const skill = await Skill.create(payload);
  return await skill.populate('category');
};

export const updateSkill = async (
  id: string,
  data: UpdateSkillInput,
  file?: Express.Multer.File
): Promise<ISkillDocument> => {
  if (data.category) {
    const categoryExists = await Category.findById(data.category);
    if (!categoryExists) {
      throw new Error('The referenced Category does not exist.');
    }
  }

  const payload: Partial<ISkillDocument> = { ...data };

  // If a new file is uploaded, update the logo URL
  if (file) {
    const existingSkill = await Skill.findById(id);
    if (existingSkill?.logoUrl) {
      deleteLocalFile(existingSkill.logoUrl);
    }
    payload.logoUrl = `/uploads/skill/${file.filename}`;
  }

  const skill = await Skill.findByIdAndUpdate(id, payload, { new: true }).populate('category');
  if (!skill) {
    throw new Error('Skill not found.');
  }

  return skill;
};

export const deleteSkill = async (id: string): Promise<void> => {
  const skill = await Skill.findById(id);
  if (!skill) {
    throw new Error('Skill not found.');
  }

  if (skill.logoUrl) {
    deleteLocalFile(skill.logoUrl);
  }

  await Skill.findByIdAndDelete(id);
};
