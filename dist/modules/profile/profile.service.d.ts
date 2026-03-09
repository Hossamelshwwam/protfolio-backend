import { IProfileDocument } from './profile.model';
import { UpdateProfileInput } from './profile.validation';
export declare const getProfile: () => Promise<IProfileDocument>;
export declare const updateProfile: (data: UpdateProfileInput, files?: {
    logo?: Express.Multer.File[];
    cv?: Express.Multer.File[];
}) => Promise<IProfileDocument>;
//# sourceMappingURL=profile.service.d.ts.map