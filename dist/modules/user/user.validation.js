"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.changePasswordSchema = exports.updateUserSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../../types");
// ─── Register ─────────────────────────────────────────────────────────────────
exports.registerSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: 'Name is required' })
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .trim(),
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address')
        .toLowerCase()
        .trim(),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    role: zod_1.z
        .nativeEnum(types_1.UserRole, { message: 'Role must be admin or user' })
        .optional()
        .default(types_1.UserRole.USER),
});
// ─── Login ────────────────────────────────────────────────────────────────────
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address')
        .toLowerCase()
        .trim(),
    password: zod_1.z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
});
// ─── Update Profile ───────────────────────────────────────────────────────────
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .trim()
        .optional(),
    email: zod_1.z.string().email('Invalid email address').toLowerCase().trim().optional(),
});
// ─── Change Password ──────────────────────────────────────────────────────────
exports.changePasswordSchema = zod_1.z
    .object({
    currentPassword: zod_1.z.string({ required_error: 'Current password is required' }).min(1),
    newPassword: zod_1.z
        .string({ required_error: 'New password is required' })
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: zod_1.z.string({ required_error: 'Please confirm your password' }),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
// ─── Forgot Password ──────────────────────────────────────────────────────────
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address')
        .toLowerCase()
        .trim(),
});
// ─── Reset Password ───────────────────────────────────────────────────────────
exports.resetPasswordSchema = zod_1.z
    .object({
    newPassword: zod_1.z
        .string({ required_error: 'New password is required' })
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: zod_1.z.string({ required_error: 'Please confirm your password' }),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
//# sourceMappingURL=user.validation.js.map