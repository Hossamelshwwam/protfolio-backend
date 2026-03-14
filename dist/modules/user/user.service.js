"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.deleteUser = exports.changePassword = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const jwt_1 = require("../../utils/jwt");
const email_1 = require("../../utils/email");
const crypto_1 = __importDefault(require("crypto"));
// ─── Register ─────────────────────────────────────────────────────────────────
const registerUser = async (data) => {
    const existing = await user_model_1.default.findOne({ email: data.email });
    if (existing) {
        throw new Error('An account with this email already exists.');
    }
    const user = await user_model_1.default.create(data);
    const token = (0, jwt_1.signToken)({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    });
    return { user: user.toJSON(), token };
};
exports.registerUser = registerUser;
// ─── Login ────────────────────────────────────────────────────────────────────
const loginUser = async (data) => {
    // select: false on password — must explicitly include it
    const user = await user_model_1.default.findOne({ email: data.email }).select('+password');
    if (!user) {
        throw new Error('Invalid email or password.');
    }
    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
        throw new Error('Invalid email or password.');
    }
    const token = (0, jwt_1.signToken)({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    });
    return { user: user.toJSON(), token };
};
exports.loginUser = loginUser;
// ─── Get All Users (Admin) ────────────────────────────────────────────────────
const getAllUsers = async () => {
    return user_model_1.default.find().sort({ createdAt: -1 });
};
exports.getAllUsers = getAllUsers;
// ─── Get User by ID ───────────────────────────────────────────────────────────
const getUserById = async (id) => {
    const user = await user_model_1.default.findById(id);
    if (!user) {
        throw new Error('User not found.');
    }
    return user;
};
exports.getUserById = getUserById;
// ─── Update User ──────────────────────────────────────────────────────────────
const updateUser = async (id, data) => {
    // Check email uniqueness if email is being updated
    if (data.email) {
        const existing = await user_model_1.default.findOne({ email: data.email, _id: { $ne: id } });
        if (existing) {
            throw new Error('This email is already in use by another account.');
        }
    }
    const user = await user_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new Error('User not found.');
    }
    return user;
};
exports.updateUser = updateUser;
// ─── Change Password ──────────────────────────────────────────────────────────
const changePassword = async (id, data) => {
    const user = await user_model_1.default.findById(id).select('+password');
    if (!user) {
        throw new Error('User not found.');
    }
    const isMatch = await user.comparePassword(data.currentPassword);
    if (!isMatch) {
        throw new Error('Current password is incorrect.');
    }
    user.password = data.newPassword;
    await user.save(); // triggers pre-save hook to hash new password
};
exports.changePassword = changePassword;
// ─── Delete User ──────────────────────────────────────────────────────────────
const deleteUser = async (id) => {
    const user = await user_model_1.default.findByIdAndDelete(id);
    if (!user) {
        throw new Error('User not found.');
    }
};
exports.deleteUser = deleteUser;
// ─── Forgot Password ──────────────────────────────────────────────────────────
const forgotPassword = async (data) => {
    const user = await user_model_1.default.findOne({ email: data.email });
    // Always resolve — never leak whether the email exists
    if (!user)
        return;
    const rawToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;
    await (0, email_1.sendPasswordResetEmail)(user.email, resetUrl);
};
exports.forgotPassword = forgotPassword;
// ─── Reset Password ───────────────────────────────────────────────────────────
const resetPassword = async (rawToken, data) => {
    // Hash the incoming raw token to match against what's stored in the DB
    const hashedToken = crypto_1.default.createHash('sha256').update(rawToken).digest('hex');
    const user = await user_model_1.default.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: new Date() }, // token must not be expired
    }).select('+resetPasswordToken +resetPasswordExpires');
    if (!user) {
        throw new Error('Reset token is invalid or has expired.');
    }
    // Set new password (pre-save hook will hash it)
    user.password = data.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=user.service.js.map