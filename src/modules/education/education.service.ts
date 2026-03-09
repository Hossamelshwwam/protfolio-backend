import Education, { IEducationDocument } from "./education.model";
import {
  CreateEducationInput,
  UpdateEducationInput,
} from "./education.validation";

export const getAllEducations = async (): Promise<IEducationDocument[]> => {
  // Sort by startDate descending (newest education first)
  return await Education.find({}).sort({ startDate: -1 });
};

export const getEducationById = async (
  id: string,
): Promise<IEducationDocument> => {
  const education = await Education.findById(id);
  if (!education) {
    throw new Error("Education record not found.");
  }
  return education;
};

export const createEducation = async (
  data: CreateEducationInput,
): Promise<IEducationDocument> => {
  return await Education.create(data);
};

export const updateEducation = async (
  id: string,
  data: UpdateEducationInput,
): Promise<IEducationDocument> => {
  const education = await Education.findByIdAndUpdate(id, data, { new: true });
  if (!education) {
    throw new Error("Education record not found.");
  }
  return education;
};

export const deleteEducation = async (id: string): Promise<void> => {
  const education = await Education.findByIdAndDelete(id);
  if (!education) {
    throw new Error("Education record not found.");
  }
};
