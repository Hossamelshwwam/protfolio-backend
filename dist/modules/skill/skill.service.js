"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkillById = exports.getAllSkills = void 0;
const skill_model_1 = __importDefault(require("./skill.model"));
const category_model_1 = __importDefault(require("../category/category.model"));
const cloudinary_utils_1 = require("../../utils/cloudinary.utils");
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
    const categoryExists = await category_model_1.default.findById(data.category);
    if (!categoryExists) {
        throw new Error('The referenced Category does not exist.');
    }
    const payload = { ...data };
    if (file) {
        // Upload logo to Cloudinary
        const result = await (0, cloudinary_utils_1.uploadToCloudinary)(file.buffer, 'portfolio/skill');
        payload.logoUrl = result.secure_url;
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
    if (file) {
        // Delete old Cloudinary logo, then upload new one
        const existingSkill = await skill_model_1.default.findById(id);
        if (existingSkill?.logoUrl) {
            await (0, cloudinary_utils_1.deleteFromCloudinary)(existingSkill.logoUrl);
        }
        const result = await (0, cloudinary_utils_1.uploadToCloudinary)(file.buffer, 'portfolio/skill');
        payload.logoUrl = result.secure_url;
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
        await (0, cloudinary_utils_1.deleteFromCloudinary)(skill.logoUrl);
    }
    await skill_model_1.default.findByIdAndDelete(id);
};
exports.deleteSkill = deleteSkill;
//# sourceMappingURL=skill.service.js.map