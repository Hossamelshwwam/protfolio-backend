import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject {
  name: string;
  description: string;
  skills: string[];
  githubUrl?: string; // Optional repo link
  demoUrl?: string; // Optional live site link
  videoUrl?: string; // Optional external video link (e.g. YouTube, Google Drive)
  mainImageUrl: string; // Required cover image (stored locally via Multer)
  imagesUrls: string[]; // Additional optional images (stored locally via Multer)
}

export interface IProjectDocument extends IProject, Document {}

const projectSchema = new Schema<IProjectDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    skills: {
      type: [String],
      default: []
    },
    githubUrl: {
      type: String,
      trim: true
    },
    demoUrl: {
      type: String,
      trim: true
    },
    videoUrl: {
      type: String,
      trim: true
    },
    mainImageUrl: {
      type: String,
      required: true
    },
    imagesUrls: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Project: Model<IProjectDocument> = mongoose.model<IProjectDocument>(
  'Project',
  projectSchema
);

export default Project;
