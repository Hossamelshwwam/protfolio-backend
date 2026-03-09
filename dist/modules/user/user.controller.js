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
exports.resetPassword = exports.forgotPassword = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.changeMyPassword = exports.updateMe = exports.getMe = exports.login = exports.register = void 0;
const UserService = __importStar(require("./user.service"));
const response_1 = require("../../utils/response");
// ─── Auth ─────────────────────────────────────────────────────────────────────
const register = async (req, res) => {
    try {
        const result = await UserService.registerUser(req.body);
        (0, response_1.sendSuccess)(res, 'Account created successfully.', result, 201);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Registration failed.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const result = await UserService.loginUser(req.body);
        (0, response_1.sendSuccess)(res, 'Login successful.', result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Login failed.';
        (0, response_1.sendError)(res, message, 401);
    }
};
exports.login = login;
// ─── Profile ──────────────────────────────────────────────────────────────────
const getMe = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.user.userId);
        (0, response_1.sendSuccess)(res, 'Profile fetched successfully.', user);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch profile.';
        (0, response_1.sendError)(res, message, 404);
    }
};
exports.getMe = getMe;
const updateMe = async (req, res) => {
    try {
        const user = await UserService.updateUser(req.user.userId, req.body);
        (0, response_1.sendSuccess)(res, 'Profile updated successfully.', user);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Update failed.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.updateMe = updateMe;
const changeMyPassword = async (req, res) => {
    try {
        await UserService.changePassword(req.user.userId, req.body);
        (0, response_1.sendSuccess)(res, 'Password changed successfully.');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Password change failed.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.changeMyPassword = changeMyPassword;
// ─── Admin ────────────────────────────────────────────────────────────────────
const getAllUsers = async (_req, res) => {
    try {
        const users = await UserService.getAllUsers();
        (0, response_1.sendSuccess)(res, 'Users fetched successfully.', users);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch users.';
        (0, response_1.sendError)(res, message, 500);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        (0, response_1.sendSuccess)(res, 'User fetched successfully.', user);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'User not found.';
        (0, response_1.sendError)(res, message, 404);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const user = await UserService.updateUser(req.params.id, req.body);
        (0, response_1.sendSuccess)(res, 'User updated successfully.', user);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Update failed.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        await UserService.deleteUser(req.params.id);
        (0, response_1.sendSuccess)(res, 'User deleted successfully.');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Delete failed.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.deleteUser = deleteUser;
// ─── Forgot Password ──────────────────────────────────────────────────────────
const forgotPassword = async (req, res) => {
    try {
        await UserService.forgotPassword(req.body);
        // Always return the same message — don't leak whether the email exists
        (0, response_1.sendSuccess)(res, 'If that email is registered, a reset link has been sent.');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Something went wrong.';
        (0, response_1.sendError)(res, message, 500);
    }
};
exports.forgotPassword = forgotPassword;
// ─── Reset Password ───────────────────────────────────────────────────────────
const resetPassword = async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) {
            (0, response_1.sendError)(res, 'Reset token is missing from the request.', 400);
            return;
        }
        await UserService.resetPassword(token, req.body);
        (0, response_1.sendSuccess)(res, 'Password has been reset successfully. You can now log in.');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Password reset failed.';
        (0, response_1.sendError)(res, message, 400);
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=user.controller.js.map