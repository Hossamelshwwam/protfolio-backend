import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { IUser, UserRole } from '../../types';

// ─── Document Interface ───────────────────────────────────────────────────────
export interface IUserDocument extends IUser, Document {
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createPasswordResetToken(): string;
}

// ─── Schema ───────────────────────────────────────────────────────────────────
const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // never return password in queries by default
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ─── Pre-save Hook: Hash Password ─────────────────────────────────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const rounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
  this.password = await bcrypt.hash(this.password, rounds);
  next();
});

// ─── Instance Method: Compare Password ───────────────────────────────────────
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// ─── Instance Method: Create Password Reset Token ─────────────────────────────
userSchema.methods.createPasswordResetToken = function (): string {
  // 1. Generate a cryptographically-secure raw token (sent in the email)
  const rawToken = crypto.randomBytes(32).toString('hex');

  // 2. Hash and store it — never store the raw token in the DB
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');

  // 3. Token expires in 10 minutes
  this.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);

  return rawToken;
};

// ─── Transform: Remove sensitive fields from JSON output ──────────────────────
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete (ret as unknown as Record<string, unknown>)['password'];
    return ret;
  },
});

const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema);

export default User;
