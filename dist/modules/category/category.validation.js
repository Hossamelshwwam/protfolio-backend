"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
const category_model_1 = require("./category.model");
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters long').trim(),
    type: zod_1.z.nativeEnum(category_model_1.CategoryType).optional()
});
exports.updateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).trim().optional(),
    type: zod_1.z.nativeEnum(category_model_1.CategoryType).optional()
});
//# sourceMappingURL=category.validation.js.map