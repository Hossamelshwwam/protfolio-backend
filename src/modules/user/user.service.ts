import User, { IUserDocument } from './user.model';
import { IUser } from '../../types';
import { signToken } from '../../utils/jwt';
import { sendPasswordResetEmail } from '../../utils/email';
import crypto from 'crypto';
import {
  RegisterInput,
  LoginInput,
  UpdateUserInput,
  ChangePasswordInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from './user.validation';

// ─── Auth Response Shape ──────────────────────────────────────────────────────
interface AuthResult {
  user: Partial<IUser>;
  token: string;
}

// ─── Register ─────────────────────────────────────────────────────────────────
export const registerUser = async (data: RegisterInput): Promise<AuthResult> => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new Error('An account with this email already exists.');
  }

  const user = await User.create(data);

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return { user: user.toJSON() as unknown as Partial<IUser>, token };
};

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginUser = async (data: LoginInput): Promise<AuthResult> => {
  // select: false on password — must explicitly include it
  const user = await User.findOne({ email: data.email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isMatch = await user.comparePassword(data.password);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }

  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return { user: user.toJSON() as unknown as Partial<IUser>, token };
};

// ─── Get All Users (Admin) ────────────────────────────────────────────────────
export const getAllUsers = async (): Promise<IUserDocument[]> => {
  return User.find().sort({ createdAt: -1 });
};

// ─── Get User by ID ───────────────────────────────────────────────────────────
export const getUserById = async (id: string): Promise<IUserDocument> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found.');
  }
  return user;
};

// ─── Update User ──────────────────────────────────────────────────────────────
export const updateUser = async (
  id: string,
  data: UpdateUserInput
): Promise<IUserDocument> => {
  // Check email uniqueness if email is being updated
  if (data.email) {
    const existing = await User.findOne({ email: data.email, _id: { $ne: id } });
    if (existing) {
      throw new Error('This email is already in use by another account.');
    }
  }

  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new Error('User not found.');
  }

  return user;
};

// ─── Change Password ──────────────────────────────────────────────────────────
export const changePassword = async (
  id: string,
  data: ChangePasswordInput
): Promise<void> => {
  const user = await User.findById(id).select('+password');
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

// ─── Delete User ──────────────────────────────────────────────────────────────
export const deleteUser = async (id: string): Promise<void> => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('User not found.');
  }
};

// ─── Forgot Password ──────────────────────────────────────────────────────────
export const forgotPassword = async (data: ForgotPasswordInput): Promise<void> => {
  const user = await User.findOne({ email: data.email });

  // Always resolve — never leak whether the email exists
  if (!user) return;

  const rawToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;

  await sendPasswordResetEmail(user.email, resetUrl);
};

// ─── Reset Password ───────────────────────────────────────────────────────────
export const resetPassword = async (
  rawToken: string,
  data: ResetPasswordInput
): Promise<void> => {
  // Hash the incoming raw token to match against what's stored in the DB
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

  const user = await User.findOne({
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

