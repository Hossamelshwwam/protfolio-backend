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
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperienceById = exports.getAllExperiences = void 0;
const ExperienceService = __importStar(require("./experience.service"));
const response_1 = require("../../utils/response");
const getAllExperiences = async (_req, res) => {
    try {
        const experiences = await ExperienceService.getAllExperiences();
        (0, response_1.sendSuccess)(res, 'Experiences fetched successfully.', experiences);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch experiences.';
        (0, response_1.sendError)(res, message, 500);
    }
};
exports.getAllExperiences = getAllExperiences;
const getExperienceById = async (req, res) => {
    try {
        const experience = await ExperienceService.getExperienceById(req.params.id);
        (0, response_1.sendSuccess)(res, 'Experience fetched successfully.', experience);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch experience.';
        (0, response_1.sendError)(res, message, 404);
    }
};
exports.getExperienceById = getExperienceById;
const createExperience = async (req, res) => {
    try {
        const experience = await ExperienceService.createExperience(req.body);
        (0, response_1.sendSuccess)(res, 'Experience created successfully.', experience, 201);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create experience.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.createExperience = createExperience;
const updateExperience = async (req, res) => {
    try {
        const experience = await ExperienceService.updateExperience(req.params.id, req.body);
        (0, response_1.sendSuccess)(res, 'Experience updated successfully.', experience);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update experience.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.updateExperience = updateExperience;
const deleteExperience = async (req, res) => {
    try {
        await ExperienceService.deleteExperience(req.params.id);
        (0, response_1.sendSuccess)(res, 'Experience deleted successfully.');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete experience.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.deleteExperience = deleteExperience;
//# sourceMappingURL=experience.controller.js.map