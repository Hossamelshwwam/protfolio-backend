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
const UserController = __importStar(require("./user.controller"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const user_validation_1 = require("./user.validation");
const types_1 = require("../../types");
const router = (0, express_1.Router)();
// ─── Auth Routes ──────────────────────────────────────────────────────────────
// POST /api/users/register
router.post('/register', (0, validate_middleware_1.validate)(user_validation_1.registerSchema), UserController.register);
// POST /api/users/login
router.post('/login', (0, validate_middleware_1.validate)(user_validation_1.loginSchema), UserController.login);
// POST /api/users/forgot-password
router.post('/forgot-password', (0, validate_middleware_1.validate)(user_validation_1.forgotPasswordSchema), UserController.forgotPassword);
// POST /api/users/reset-password?token=<rawToken>
router.post('/reset-password', (0, validate_middleware_1.validate)(user_validation_1.resetPasswordSchema), UserController.resetPassword);
// ─── Profile Routes (Authenticated) ──────────────────────────────────────────
// GET /api/users/me
router.get('/me', auth_middleware_1.authenticate, UserController.getMe);
// PATCH /api/users/me
router.patch('/me', auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(user_validation_1.updateUserSchema), UserController.updateMe);
// PATCH /api/users/me/change-password
router.patch('/me/change-password', auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(user_validation_1.changePasswordSchema), UserController.changeMyPassword);
// ─── Admin Routes ─────────────────────────────────────────────────────────────
// GET /api/users
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(types_1.UserRole.ADMIN), UserController.getAllUsers);
// GET /api/users/:id
router.get('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(types_1.UserRole.ADMIN), UserController.getUserById);
// PATCH /api/users/:id
router.patch('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(types_1.UserRole.ADMIN), (0, validate_middleware_1.validate)(user_validation_1.updateUserSchema), UserController.updateUser);
// DELETE /api/users/:id
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(types_1.UserRole.ADMIN), UserController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map