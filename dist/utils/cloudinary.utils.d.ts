import { UploadApiResponse } from 'cloudinary';
/**
 * Upload a file buffer to Cloudinary.
 * @param buffer  - The file buffer (from multer memoryStorage)
 * @param folder  - The Cloudinary folder (e.g. "portfolio/profile")
 * @param publicId - Optional custom public_id (without extension)
 * @returns The secure URL of the uploaded asset
 */
export declare const uploadToCloudinary: (buffer: Buffer, folder: string, publicId?: string) => Promise<UploadApiResponse>;
/**
 * Delete an asset from Cloudinary by its URL.
 * Extracts the public_id from the URL automatically.
 */
export declare const deleteFromCloudinary: (url: string) => Promise<void>;
//# sourceMappingURL=cloudinary.utils.d.ts.map