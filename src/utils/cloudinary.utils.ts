import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

/**
 * Upload a file buffer to Cloudinary.
 * @param buffer  - The file buffer (from multer memoryStorage)
 * @param folder  - The Cloudinary folder (e.g. "portfolio/profile")
 * @param publicId - Optional custom public_id (without extension)
 * @returns The secure URL of the uploaded asset
 */
export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  publicId?: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = { folder };
    if (publicId) uploadOptions.public_id = publicId;

    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error || !result) {
        return reject(error ?? new Error('Cloudinary upload failed.'));
      }
      resolve(result);
    });

    stream.end(buffer);
  });
};

/**
 * Delete an asset from Cloudinary by its URL.
 * Extracts the public_id from the URL automatically.
 */
export const deleteFromCloudinary = async (url: string): Promise<void> => {
  try {
    // Extract the public_id from a Cloudinary URL
    // Example URL: https://res.cloudinary.com/<cloud>/image/upload/v1234/portfolio/profile/abc.jpg
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return;

    // Skip the version segment (v1234) if present
    let pathParts = parts.slice(uploadIndex + 1);
    if (pathParts[0]?.startsWith('v') && !isNaN(Number(pathParts[0].slice(1)))) {
      pathParts = pathParts.slice(1);
    }

    // Join and strip the file extension to get public_id
    const publicIdWithExt = pathParts.join('/');
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');

    await cloudinary.uploader.destroy(publicId);
  } catch {
    // Non-critical – log silently
    console.warn('Could not delete Cloudinary asset:', url);
  }
};
