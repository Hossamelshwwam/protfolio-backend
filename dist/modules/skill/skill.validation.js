"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSkillSchema = exports.createSkillSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
// Validation for text fields sent via multipart/form-data
exports.createSkillSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters long').trim(),
    category: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: 'Invalid Category ID format',
    }),
});
exports.updateSkillSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).trim().optional(),
    category: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: 'Invalid Category ID format',
    }).optional(),
});
//# sourceMappingURL=skill.validation.js.map