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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getAllProjects = void 0;
const ProjectService = __importStar(require("./project.service"));
const response_1 = require("../../utils/response");
const project_validation_1 = require("./project.validation");
// Helper to format dynamic URLs so clients receive full links
const formatProjectResponse = (req, project) => {
    const json = project.toJSON ? project.toJSON() : project;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    if (json.mainImageUrl && json.mainImageUrl.startsWith('/uploads/')) {
        json.mainImageUrl = `${baseUrl}${json.mainImageUrl}`;
    }
    if (json.imagesUrls && Array.isArray(json.imagesUrls)) {
        json.imagesUrls = json.imagesUrls.map((url) => {
            if (url.startsWith('/uploads/'))
                return `${baseUrl}${url}`;
            return url;
        });
    }
    return json;
};
const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectService.getAllProjects();
        const formatted = projects.map(p => formatProjectResponse(req, p));
        (0, response_1.sendSuccess)(res, 'Projects fetched successfully.', formatted);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch projects.';
        (0, response_1.sendError)(res, message, 500);
    }
};
exports.getAllProjects = getAllProjects;
const getProjectById = async (req, res) => {
    try {
        const project = await ProjectService.getProjectById(req.params.id);
        (0, response_1.sendSuccess)(res, 'Project fetched successfully.', formatProjectResponse(req, project));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch project.';
        (0, response_1.sendError)(res, message, 404);
    }
};
exports.getProjectById = getProjectById;
const createProject = async (req, res) => {
    try {
        // 1. Zod runtime validation
        // (This handles mapping a comma separated string sequence to a string[] for skills!)
        const validatedData = project_validation_1.createProjectSchema.parse(req.body);
        const files = req.files;
        const project = await ProjectService.createProject(validatedData, files);
        (0, response_1.sendSuccess)(res, 'Project created successfully.', formatProjectResponse(req, project), 201);
    }
    catch (error) {
        if (error && typeof error === 'object' && 'errors' in error) {
            (0, response_1.sendError)(res, 'Validation failed.', 400, error.errors);
            return;
        }
        const message = error instanceof Error ? error.message : 'Failed to create project.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    try {
        const validatedData = project_validation_1.updateProjectSchema.parse(req.body);
        const files = req.files;
        const project = await ProjectService.updateProject(req.params.id, validatedData, files);
        (0, response_1.sendSuccess)(res, 'Project updated successfully.', formatProjectResponse(req, project));
    }
    catch (error) {
        if (error && typeof error === 'object' && 'errors' in error) {
            (0, response_1.sendError)(res, 'Validation failed.', 400, error.errors);
            return;
        }
        const message = error instanceof Error ? error.message : 'Failed to update project.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        await ProjectService.deleteProject(req.params.id);
        (0, response_1.sendSuccess)(res, 'Project deleted successfully.');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete project.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.controller.js.map