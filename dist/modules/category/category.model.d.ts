import { Document, Model } from "mongoose";
export declare enum CategoryType {
    OTHER = "other",
    ANY = "any",
    FRONTEND = "frontend",
    BACKEND = "backend",
    DATABASE = "database",
    TOOL = "tool"
}
export interface ICategory {
    name: string;
    type: CategoryType;
}
export interface ICategoryDocument extends ICategory, Document {
}
declare const Category: Model<ICategoryDocument>;
export default Category;
//# sourceMappingURL=category.model.d.ts.map