import fs from 'fs';
import path from 'path';

/**
 * Safely deletes a file from the local root `uploads` directory.
 * @param relativeUrl - The relative URL string stored in the DB (e.g. `/uploads/profile/logo.png`)
 */
export const deleteLocalFile = (relativeUrl: string): void => {
  if (!relativeUrl) return;

  try {
    // Reconstruct the actual file system path
    // __dirname is usually inside src/utils
    // relativeUrl gives us '/uploads/...'
    const filePath = path.join(__dirname, '../../', relativeUrl);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🧼 Deleted old file: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Failed to delete old file (${relativeUrl}):`, error);
  }
};
