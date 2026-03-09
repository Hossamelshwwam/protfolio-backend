"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperienceById = exports.getAllExperiences = void 0;
const experience_model_1 = __importDefault(require("./experience.model"));
const getAllExperiences = async () => {
    // Sort by startDate descending (newest experiences first)
    return await experience_model_1.default.find({}).sort({ startDate: -1 });
};
exports.getAllExperiences = getAllExperiences;
const getExperienceById = async (id) => {
    const experience = await experience_model_1.default.findById(id);
    if (!experience) {
        throw new Error('Experience not found.');
    }
    return experience;
};
exports.getExperienceById = getExperienceById;
const createExperience = async (data) => {
    return await experience_model_1.default.create(data);
};
exports.createExperience = createExperience;
const updateExperience = async (id, data) => {
    const experience = await experience_model_1.default.findByIdAndUpdate(id, data, { new: true });
    if (!experience) {
        throw new Error('Experience not found.');
    }
    return experience;
};
exports.updateExperience = updateExperience;
const deleteExperience = async (id) => {
    const experience = await experience_model_1.default.findByIdAndDelete(id);
    if (!experience) {
        throw new Error('Experience not found.');
    }
};
exports.deleteExperience = deleteExperience;
//# sourceMappingURL=experience.service.js.map