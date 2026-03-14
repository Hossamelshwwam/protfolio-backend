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
exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkillById = exports.getAllSkills = void 0;
const SkillService = __importStar(require("./skill.service"));
const response_1 = require("../../utils/response");
const skill_validation_1 = require("./skill.validation");
const getAllSkills = async (_req, res) => {
    try {
        const skills = await SkillService.getAllSkills();
        // Cloudinary URLs are already absolute – return directly
        const skillsJson = skills.map(s => (s.toJSON ? s.toJSON() : s));
        (0, response_1.sendSuccess)(res, 'Skills fetched successfully.', skillsJson);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch skills.';
        (0, response_1.sendError)(res, message, 500);
    }
};
exports.getAllSkills = getAllSkills;
const getSkillById = async (req, res) => {
    try {
        const skill = await SkillService.getSkillById(req.params.id);
        (0, response_1.sendSuccess)(res, 'Skill fetched successfully.', skill.toJSON ? skill.toJSON() : skill);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch skill.';
        (0, response_1.sendError)(res, message, 404);
    }
};
exports.getSkillById = getSkillById;
const createSkill = async (req, res) => {
    try {
        const validatedData = skill_validation_1.createSkillSchema.parse(req.body);
        const file = req.file;
        const skill = await SkillService.createSkill(validatedData, file);
        (0, response_1.sendSuccess)(res, 'Skill created successfully.', skill.toJSON ? skill.toJSON() : skill, 201);
    }
    catch (error) {
        if (error && typeof error === 'object' && 'errors' in error) {
            (0, response_1.sendError)(res, 'Validation failed.', 400, error.errors);
            return;
        }
        const message = error instanceof Error ? error.message : 'Failed to create skill.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.createSkill = createSkill;
const updateSkill = async (req, res) => {
    try {
        const validatedData = skill_validation_1.updateSkillSchema.parse(req.body);
        const file = req.file;
        const skill = await SkillService.updateSkill(req.params.id, validatedData, file);
        (0, response_1.sendSuccess)(res, 'Skill updated successfully.', skill.toJSON ? skill.toJSON() : skill);
    }
    catch (error) {
        if (error && typeof error === 'object' && 'errors' in error) {
            (0, response_1.sendError)(res, 'Validation failed.', 400, error.errors);
            return;
        }
        const message = error instanceof Error ? error.message : 'Failed to update skill.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.updateSkill = updateSkill;
const deleteSkill = async (req, res) => {
    try {
        await SkillService.deleteSkill(req.params.id);
        (0, response_1.sendSuccess)(res, 'Skill deleted successfully.');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete skill.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.deleteSkill = deleteSkill;
//# sourceMappingURL=skill.controller.js.map