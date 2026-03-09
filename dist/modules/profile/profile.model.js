"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// ─── Schema ───────────────────────────────────────────────────────────────────
const socialLinksSchema = new mongoose_1.Schema({
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    whatsapp: { type: String, trim: true },
    facebook: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
}, { _id: false } // don't generate objectIds for subdocuments
);
const profileSchema = new mongoose_1.Schema({
    name: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    brief: { type: String, trim: true },
    socialLinks: {
        type: socialLinksSchema,
        default: {},
    },
    logoUrl: { type: String },
    cvUrl: { type: String },
}, {
    timestamps: true,
    versionKey: false,
});
// ─── Singleton enforcement (Optional) ─────────────────────────────────────────
// A Portfolio typically only has one profile config.
// The service layer will ensure we only ever update/return the first document.
const Profile = mongoose_1.default.model('Profile', profileSchema);
exports.default = Profile;
//# sourceMappingURL=profile.model.js.map