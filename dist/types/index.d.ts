import { Request } from 'express';
import { Types } from 'mongoose';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export interface JwtPayload {
    userId: string;
    email: string;
    role: UserRole;
}
export interface AuthRequest extends Request {
    user?: JwtPayload;
}
export interface ApiResponse<T = null> {
    success: boolean;
    message: string;
    data?: T;
    errors?: unknown;
}
//# sourceMappingURL=index.d.ts.map