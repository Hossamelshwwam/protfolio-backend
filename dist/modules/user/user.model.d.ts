import { Document, Model } from 'mongoose';
import { IUser } from '../../types';
export interface IUserDocument extends IUser, Document {
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    createPasswordResetToken(): string;
}
declare const User: Model<IUserDocument>;
export default User;
//# sourceMappingURL=user.model.d.ts.map