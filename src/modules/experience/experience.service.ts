import Experience, { IExperienceDocument } from './experience.model';
import { CreateExperienceInput, UpdateExperienceInput } from './experience.validation';

export const getAllExperiences = async (): Promise<IExperienceDocument[]> => {
  // Sort by startDate descending (newest experiences first)
  return await Experience.find({}).sort({ startDate: -1 });
};

export const getExperienceById = async (id: string): Promise<IExperienceDocument> => {
  const experience = await Experience.findById(id);
  if (!experience) {
    throw new Error('Experience not found.');
  }
  return experience;
};

export const createExperience = async (data: CreateExperienceInput): Promise<IExperienceDocument> => {
  return await Experience.create(data);
};

export const updateExperience = async (id: string, data: UpdateExperienceInput): Promise<IExperienceDocument> => {
  const experience = await Experience.findByIdAndUpdate(id, data, { new: true });
  if (!experience) {
    throw new Error('Experience not found.');
  }
  return experience;
};

export const deleteExperience = async (id: string): Promise<void> => {
  const experience = await Experience.findByIdAndDelete(id);
  if (!experience) {
    throw new Error('Experience not found.');
  }
};
