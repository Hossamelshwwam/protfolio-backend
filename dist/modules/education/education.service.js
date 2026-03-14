"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getEducationById = exports.getAllEducations = void 0;
const education_model_1 = __importDefault(require("./education.model"));
const getAllEducations = async () => {
    // Sort by startDate descending (newest education first)
    return await education_model_1.default.find({}).sort({ startDate: -1 });
};
exports.getAllEducations = getAllEducations;
const getEducationById = async (id) => {
    const education = await education_model_1.default.findById(id);
    if (!education) {
        throw new Error("Education record not found.");
    }
    return education;
};
exports.getEducationById = getEducationById;
const createEducation = async (data) => {
    return await education_model_1.default.create(data);
};
exports.createEducation = createEducation;
const updateEducation = async (id, data) => {
    const education = await education_model_1.default.findByIdAndUpdate(id, data, { new: true });
    if (!education) {
        throw new Error("Education record not found.");
    }
    return education;
};
exports.updateEducation = updateEducation;
const deleteEducation = async (id) => {
    const education = await education_model_1.default.findByIdAndDelete(id);
    if (!education) {
        throw new Error("Education record not found.");
    }
};
exports.deleteEducation = deleteEducation;
//# sourceMappingURL=education.service.js.map