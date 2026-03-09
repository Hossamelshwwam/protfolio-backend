import mongoose, { Schema, Document, Model } from 'mongoose';

// ─── Interfaces ───────────────────────────────────────────────────────────────
export interface ISocialLinks {
  linkedin?: string;
  github?: string;
  whatsapp?: string;
  facebook?: string;
  phone?: string;
  email?: string;
}

export interface IProfile {
  name?: string;
  jobTitle?: string;
  brief?: string;
  socialLinks?: ISocialLinks;
  logoUrl?: string;
  cvUrl?: string;
}

export interface IProfileDocument extends IProfile, Document {}

// ─── Schema ───────────────────────────────────────────────────────────────────
const socialLinksSchema = new Schema<ISocialLinks>(
  {
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    whatsapp: { type: String, trim: true },
    facebook: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
  },
  { _id: false } // don't generate objectIds for subdocuments
);

const profileSchema = new Schema<IProfileDocument>(
  {
    name: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    brief: { type: String, trim: true },
    socialLinks: {
      type: socialLinksSchema,
      default: {},
    },
    logoUrl: { type: String },
    cvUrl: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ─── Singleton enforcement (Optional) ─────────────────────────────────────────
// A Portfolio typically only has one profile config.
// The service layer will ensure we only ever update/return the first document.

const Profile: Model<IProfileDocument> = mongoose.model<IProfileDocument>(
  'Profile',
  profileSchema
);

export default Profile;
