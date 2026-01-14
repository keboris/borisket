import { Schema, model } from "mongoose";

const localizedString = {
  fr: { type: String, required: true, trim: true },
  en: { type: String, trim: true },
  de: { type: String, trim: true },
};

const menuSchema = new Schema(
  {
    name: localizedString,

    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
      index: true,
    },
    order: {
      type: Number,
      min: 1,
    },
    icon: {
      type: String,
      required: [true, "Icône est requise"],
      trim: true,
    },
    path: {
      type: String,
      required: [true, "Path est requis"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Couleur est requise"],
      trim: true,
    },
    glow: {
      type: String,
      required: [true, "Lueur est requise"],
      trim: true,
    },
    external: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

menuSchema.index({ parentId: 1, order: 1 }, { unique: true });

export default model("Menu", menuSchema);
