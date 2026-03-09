import mongoose, { Schema, Document, Model } from 'mongoose';
import { ICategoryDocument } from '../category/category.model';

export interface ISkill {
  name: string;
  logoUrl?: string; // Stored natively as a relative URL inside /uploads/skill/...
  category: string | ICategoryDocument; // References Category ObjectId
}

export interface ISkillDocument extends ISkill, Document {}

const skillSchema = new Schema<ISkillDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    logoUrl: {
      type: String
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Skill: Model<ISkillDocument> = mongoose.model<ISkillDocument>(
  'Skill',
  skillSchema
);

export default Skill;
