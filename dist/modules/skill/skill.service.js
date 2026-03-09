"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkillById = exports.getAllSkills = void 0;
const skill_model_1 = __importDefault(require("./skill.model"));
const category_model_1 = __importDefault(require("../category/category.model"));
const file_utils_1 = require("../../utils/file.utils");
const getAllSkills = async () => {
    return await skill_model_1.default.find({}).populate('category').sort({ createdAt: -1 });
};
exports.getAllSkills = getAllSkills;
const getSkillById = async (id) => {
    const skill = await skill_model_1.default.findById(id).populate('category');
    if (!skill) {
        throw new Error('Skill not found.');
    }
    return skill;
};
exports.getSkillById = getSkillById;
const createSkill = async (data, file) => {
    // Ensure the referenced category exists
    const categoryExists = await category_model_1.default.findById(data.category);
    if (!categoryExists) {
        throw new Error('The referenced Category does not exist.');
    }
    const payload = { ...data };
    // Attach logo file path if uploaded
    if (file) {
        payload.logoUrl = `/uploads/skill/${file.filename}`;
    }
    const skill = await skill_model_1.default.create(payload);
    return await skill.populate('category');
};
exports.createSkill = createSkill;
const updateSkill = async (id, data, file) => {
    if (data.category) {
        const categoryExists = await category_model_1.default.findById(data.category);
        if (!categoryExists) {
            throw new Error('The referenced Category does not exist.');
        }
    }
    const payload = { ...data };
    // If a new file is uploaded, update the logo URL
    if (file) {
        const existingSkill = await skill_model_1.default.findById(id);
        if (existingSkill?.logoUrl) {
            (0, file_utils_1.deleteLocalFile)(existingSkill.logoUrl);
        }
        payload.logoUrl = `/uploads/skill/${file.filename}`;
    }
    const skill = await skill_model_1.default.findByIdAndUpdate(id, payload, { new: true }).populate('category');
    if (!skill) {
        throw new Error('Skill not found.');
    }
    return skill;
};
exports.updateSkill = updateSkill;
const deleteSkill = async (id) => {
    const skill = await skill_model_1.default.findById(id);
    if (!skill) {
        throw new Error('Skill not found.');
    }
    if (skill.logoUrl) {
        (0, file_utils_1.deleteLocalFile)(skill.logoUrl);
    }
    await skill_model_1.default.findByIdAndDelete(id);
};
exports.deleteSkill = deleteSkill;
//# sourceMappingURL=skill.service.js.map