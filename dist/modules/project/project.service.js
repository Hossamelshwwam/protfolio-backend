"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getAllProjects = void 0;
const project_model_1 = __importDefault(require("./project.model"));
const cloudinary_utils_1 = require("../../utils/cloudinary.utils");
const getAllProjects = async () => {
    return await project_model_1.default.find({}).sort({ createdAt: -1 });
};
exports.getAllProjects = getAllProjects;
const getProjectById = async (id) => {
    const project = await project_model_1.default.findById(id);
    if (!project) {
        throw new Error('Project not found.');
    }
    return project;
};
exports.getProjectById = getProjectById;
const createProject = async (data, files) => {
    if (!files?.mainImage || files.mainImage.length === 0) {
        throw new Error('mainImage is required to create a project.');
    }
    const payload = { ...data };
    // Upload main cover image to Cloudinary
    const mainResult = await (0, cloudinary_utils_1.uploadToCloudinary)(files.mainImage[0].buffer, 'portfolio/project');
    payload.mainImageUrl = mainResult.secure_url;
    // Upload additional images if provided
    if (files.images && files.images.length > 0) {
        const uploadPromises = files.images.map(f => (0, cloudinary_utils_1.uploadToCloudinary)(f.buffer, 'portfolio/project'));
        const results = await Promise.all(uploadPromises);
        payload.imagesUrls = results.map(r => r.secure_url);
    }
    return await project_model_1.default.create(payload);
};
exports.createProject = createProject;
const updateProject = async (id, data, files) => {
    const existingProject = await project_model_1.default.findById(id);
    if (!existingProject) {
        throw new Error('Project not found.');
    }
    const payload = { ...data };
    if (files) {
        // Replace main image
        if (files.mainImage && files.mainImage.length > 0) {
            if (existingProject.mainImageUrl) {
                await (0, cloudinary_utils_1.deleteFromCloudinary)(existingProject.mainImageUrl);
            }
            const result = await (0, cloudinary_utils_1.uploadToCloudinary)(files.mainImage[0].buffer, 'portfolio/project');
            payload.mainImageUrl = result.secure_url;
        }
        // Replace secondary images array
        if (files.images && files.images.length > 0) {
            if (existingProject.imagesUrls && existingProject.imagesUrls.length > 0) {
                await Promise.all(existingProject.imagesUrls.map(url => (0, cloudinary_utils_1.deleteFromCloudinary)(url)));
            }
            const uploadPromises = files.images.map(f => (0, cloudinary_utils_1.uploadToCloudinary)(f.buffer, 'portfolio/project'));
            const results = await Promise.all(uploadPromises);
            payload.imagesUrls = results.map(r => r.secure_url);
        }
    }
    const updatedProject = await project_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return updatedProject;
};
exports.updateProject = updateProject;
const deleteProject = async (id) => {
    const project = await project_model_1.default.findById(id);
    if (!project) {
        throw new Error('Project not found.');
    }
    if (project.mainImageUrl) {
        await (0, cloudinary_utils_1.deleteFromCloudinary)(project.mainImageUrl);
    }
    if (project.imagesUrls && project.imagesUrls.length > 0) {
        await Promise.all(project.imagesUrls.map(url => (0, cloudinary_utils_1.deleteFromCloudinary)(url)));
    }
    await project_model_1.default.findByIdAndDelete(id);
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.service.js.map