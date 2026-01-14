import { Schema, model } from "mongoose";
import { fr } from "zod/locales";

const gallerySchema = new Schema(
  {
    title: {
      fr: { type: String, required: true, trim: true },
      en: { type: String, trim: true },
      de: { type: String, trim: true },
    },
    description: {
      fr: { type: String, trim: true },
      en: { type: String, trim: true },
      de: { type: String, trim: true },
    },
    images: {
      type: [String],
      default: [],
    },
    imagesPublicIds: {
      type: [String],
      default: [],
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model("Gallery", gallerySchema);
