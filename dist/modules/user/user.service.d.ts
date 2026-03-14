import { IUserDocument } from './user.model';
import { IUser } from '../../types';
import { RegisterInput, LoginInput, UpdateUserInput, ChangePasswordInput, ForgotPasswordInput, ResetPasswordInput } from './user.validation';
interface AuthResult {
    user: Partial<IUser>;
    token: string;
}
export declare const registerUser: (data: RegisterInput) => Promise<AuthResult>;
export declare const loginUser: (data: LoginInput) => Promise<AuthResult>;
export declare const getAllUsers: () => Promise<IUserDocument[]>;
export declare const getUserById: (id: string) => Promise<IUserDocument>;
export declare const updateUser: (id: string, data: UpdateUserInput) => Promise<IUserDocument>;
export declare const changePassword: (id: string, data: ChangePasswordInput) => Promise<void>;
export declare const deleteUser: (id: string) => Promise<void>;
export declare const forgotPassword: (data: ForgotPasswordInput) => Promise<void>;
export declare const resetPassword: (rawToken: string, data: ResetPasswordInput) => Promise<void>;
export {};
//# sourceMappingURL=user.service.d.ts.map