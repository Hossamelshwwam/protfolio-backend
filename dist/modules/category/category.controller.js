"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const CategoryService = __importStar(require("./category.service"));
const response_1 = require("../../utils/response");
const getAllCategories = async (_req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        (0, response_1.sendSuccess)(res, 'Categories fetched successfully.', categories);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch categories.';
        (0, response_1.sendError)(res, message, 500);
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id);
        (0, response_1.sendSuccess)(res, 'Category fetched successfully.', category);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch category.';
        (0, response_1.sendError)(res, message, 404);
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    try {
        const category = await CategoryService.createCategory(req.body);
        (0, response_1.sendSuccess)(res, 'Category created successfully.', category, 201);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create category.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const category = await CategoryService.updateCategory(req.params.id, req.body);
        (0, response_1.sendSuccess)(res, 'Category updated successfully.', category);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update category.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        await CategoryService.deleteCategory(req.params.id);
        (0, response_1.sendSuccess)(res, 'Category deleted successfully.');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete category.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map