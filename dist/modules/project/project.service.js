"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getAllProjects = void 0;
const project_model_1 = __importDefault(require("./project.model"));
const file_utils_1 = require("../../utils/file.utils");
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
    // Set main cover image
    payload.mainImageUrl = `/uploads/project/${files.mainImage[0].filename}`;
    // Set secondary images array if any provided
    if (files.images && files.images.length > 0) {
        payload.imagesUrls = files.images.map(f => `/uploads/project/${f.filename}`);
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
        // Overwrite mainImage
        if (files.mainImage && files.mainImage.length > 0) {
            if (existingProject.mainImageUrl) {
                (0, file_utils_1.deleteLocalFile)(existingProject.mainImageUrl);
            }
            payload.mainImageUrl = `/uploads/project/${files.mainImage[0].filename}`;
        }
        // Overwrite images array 
        // Usually standard to replace the whole array of secondary images when uploading new ones via form-data.
        if (files.images && files.images.length > 0) {
            if (existingProject.imagesUrls && existingProject.imagesUrls.length > 0) {
                existingProject.imagesUrls.forEach(url => (0, file_utils_1.deleteLocalFile)(url));
            }
            payload.imagesUrls = files.images.map(f => `/uploads/project/${f.filename}`);
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
    // Delete main image
    if (project.mainImageUrl) {
        (0, file_utils_1.deleteLocalFile)(project.mainImageUrl);
    }
    // Delete secondary images
    if (project.imagesUrls && project.imagesUrls.length > 0) {
        project.imagesUrls.forEach(url => (0, file_utils_1.deleteLocalFile)(url));
    }
    await project_model_1.default.findByIdAndDelete(id);
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.service.js.map