import { Request } from 'express';
import { Types } from 'mongoose';

// ─── User Role ────────────────────────────────────────────────────────────────
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

// ─── User Interface ───────────────────────────────────────────────────────────
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// ─── JWT Payload ──────────────────────────────────────────────────────────────
export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

// ─── Authenticated Request ────────────────────────────────────────────────────
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}
