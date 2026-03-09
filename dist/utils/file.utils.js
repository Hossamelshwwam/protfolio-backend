"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocalFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Safely deletes a file from the local root `uploads` directory.
 * @param relativeUrl - The relative URL string stored in the DB (e.g. `/uploads/profile/logo.png`)
 */
const deleteLocalFile = (relativeUrl) => {
    if (!relativeUrl)
        return;
    try {
        // Reconstruct the actual file system path
        // __dirname is usually inside src/utils
        // relativeUrl gives us '/uploads/...'
        const filePath = path_1.default.join(__dirname, '../../', relativeUrl);
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
            console.log(`🧼 Deleted old file: ${filePath}`);
        }
    }
    catch (error) {
        console.error(`❌ Failed to delete old file (${relativeUrl}):`, error);
    }
};
exports.deleteLocalFile = deleteLocalFile;
//# sourceMappingURL=file.utils.js.map