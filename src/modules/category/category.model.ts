import mongoose, { Schema, Document, Model } from "mongoose";
export enum CategoryType {
  OTHER = "other",
  ANY = "any",
  FRONTEND = "frontend",
  BACKEND = "backend",
  DATABASE = "database",
  TOOL = "tool",
}
export interface ICategory {
  name: string;
  type: CategoryType;
}
export interface ICategoryDocument extends ICategory, Document {}
const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      enum: Object.values(CategoryType),
      default: CategoryType.OTHER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
const Category: Model<ICategoryDocument> = mongoose.model<ICategoryDocument>(
  "Category",
  categorySchema,
);
export default Category;
