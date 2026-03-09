import mongoose, { Schema, Document, Model } from 'mongoose';

export enum ExperienceType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
  OTHER = 'other'
}

export interface IExperience {
  jobTitle: string;
  companyName: string;
  companyLink?: string;
  location: string;
  type: ExperienceType;
  startDate: Date;
  endDate?: Date; // If not provided, assumed current/present
  description?: string;
  contributions: string[];
  skills: string[];
}

export interface IExperienceDocument extends IExperience, Document {}

const experienceSchema = new Schema<IExperienceDocument>(
  {
    jobTitle: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    companyLink: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: Object.values(ExperienceType),
      default: ExperienceType.FULL_TIME
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    description: {
      type: String
    },
    contributions: {
      type: [String],
      default: []
    },
    skills: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Experience: Model<IExperienceDocument> = mongoose.model<IExperienceDocument>(
  'Experience',
  experienceSchema
);

export default Experience;
