import { ICategoryDocument } from './category.model';
import { CreateCategoryInput, UpdateCategoryInput } from './category.validation';
export declare const getAllCategories: () => Promise<ICategoryDocument[]>;
export declare const getCategoryById: (id: string) => Promise<ICategoryDocument>;
export declare const createCategory: (data: CreateCategoryInput) => Promise<ICategoryDocument>;
export declare const updateCategory: (id: string, data: UpdateCategoryInput) => Promise<ICategoryDocument>;
export declare const deleteCategory: (id: string) => Promise<void>;
//# sourceMappingURL=category.service.d.ts.map