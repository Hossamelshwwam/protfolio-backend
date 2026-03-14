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
const express_1 = require("express");
const SkillController = __importStar(require("./skill.controller"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const types_1 = require("../../types");
const upload_middleware_1 = require("../../middleware/upload.middleware");
const router = (0, express_1.Router)();
// Public Routes
router.get('/', SkillController.getAllSkills);
router.get('/:id', SkillController.getSkillById);
// Admin Only Routes
router.use(auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(types_1.UserRole.ADMIN));
// Because these endpoints handle multipart/form-data for image uploads,
// we do NOT use the standard `validate()` middleware here since Zod would 
// run before Multer parses the form-data. 
// Instead, Multer places the fields on req.body, and the Controller validates them.
router.post('/', upload_middleware_1.uploadSkillIcon, SkillController.createSkill);
router.patch('/:id', upload_middleware_1.uploadSkillIcon, SkillController.updateSkill);
router.delete('/:id', SkillController.deleteSkill);
exports.default = router;
//# sourceMappingURL=skill.routes.js.map