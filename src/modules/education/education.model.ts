import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEducation {
  degree: string;
  fieldOfStudy: string;
  university: string;
  startDate: Date;
  endDate?: Date;
  city: string;
  country: string;
  achievements: string[];
}

export interface IEducationDocument extends IEducation, Document {}

const educationSchema = new Schema<IEducationDocument>(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
    },
    university: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    achievements: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Education: Model<IEducationDocument> = mongoose.model<IEducationDocument>(
  "Education",
  educationSchema,
);

export default Education;
