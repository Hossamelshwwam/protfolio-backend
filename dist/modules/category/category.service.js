"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const getAllCategories = async () => {
    return await category_model_1.default.find({}).sort({ createdAt: -1 });
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (id) => {
    const category = await category_model_1.default.findById(id);
    if (!category) {
        throw new Error('Category not found.');
    }
    return category;
};
exports.getCategoryById = getCategoryById;
const createCategory = async (data) => {
    const existing = await category_model_1.default.findOne({ name: data.name });
    if (existing) {
        throw new Error('Category with this name already exists.');
    }
    return await category_model_1.default.create(data);
};
exports.createCategory = createCategory;
const updateCategory = async (id, data) => {
    if (data.name) {
        const existing = await category_model_1.default.findOne({ name: data.name, _id: { $ne: id } });
        if (existing) {
            throw new Error('Another category with this name already exists.');
        }
    }
    const category = await category_model_1.default.findByIdAndUpdate(id, data, { new: true });
    if (!category) {
        throw new Error('Category not found.');
    }
    return category;
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    const category = await category_model_1.default.findByIdAndDelete(id);
    if (!category) {
        throw new Error('Category not found.');
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.service.js.map