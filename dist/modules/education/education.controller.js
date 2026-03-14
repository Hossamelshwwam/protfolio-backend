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
exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getEducationById = exports.getAllEducations = void 0;
const EducationService = __importStar(require("./education.service"));
const response_1 = require("../../utils/response");
const getAllEducations = async (_req, res) => {
    try {
        const educations = await EducationService.getAllEducations();
        (0, response_1.sendSuccess)(res, "Education records fetched successfully.", educations);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch education records.";
        (0, response_1.sendError)(res, message, 500);
    }
};
exports.getAllEducations = getAllEducations;
const getEducationById = async (req, res) => {
    try {
        const education = await EducationService.getEducationById(req.params.id);
        (0, response_1.sendSuccess)(res, "Education record fetched successfully.", education);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch education record.";
        (0, response_1.sendError)(res, message, 404);
    }
};
exports.getEducationById = getEducationById;
const createEducation = async (req, res) => {
    try {
        const education = await EducationService.createEducation(req.body);
        (0, response_1.sendSuccess)(res, "Education record created successfully.", education, 201);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to create education record.";
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.createEducation = createEducation;
const updateEducation = async (req, res) => {
    try {
        const education = await EducationService.updateEducation(req.params.id, req.body);
        (0, response_1.sendSuccess)(res, "Education record updated successfully.", education);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update education record.";
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.updateEducation = updateEducation;
const deleteEducation = async (req, res) => {
    try {
        await EducationService.deleteEducation(req.params.id);
        (0, response_1.sendSuccess)(res, "Education record deleted successfully.");
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete education record.";
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.deleteEducation = deleteEducation;
//# sourceMappingURL=education.controller.js.map