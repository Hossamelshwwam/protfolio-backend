import Skill, { ISkillDocument } from './skill.model';
import Category from '../category/category.model';
import { CreateSkillInput, UpdateSkillInput } from './skill.validation';
import { uploadToCloudinary, deleteFromCloudinary } from '../../utils/cloudinary.utils';

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
  const categoryExists = await Category.findById(data.category);
  if (!categoryExists) {
    throw new Error('The referenced Category does not exist.');
  }

  const payload: Partial<ISkillDocument> = { ...data };

  if (file) {
    // Upload logo to Cloudinary
    const result = await uploadToCloudinary(file.buffer, 'portfolio/skill');
    payload.logoUrl = result.secure_url;
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

  if (file) {
    // Delete old Cloudinary logo, then upload new one
    const existingSkill = await Skill.findById(id);
    if (existingSkill?.logoUrl) {
      await deleteFromCloudinary(existingSkill.logoUrl);
    }
    const result = await uploadToCloudinary(file.buffer, 'portfolio/skill');
    payload.logoUrl = result.secure_url;
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
    await deleteFromCloudinary(skill.logoUrl);
  }

  await Skill.findByIdAndDelete(id);
};
