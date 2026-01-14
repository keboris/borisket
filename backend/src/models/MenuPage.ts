import { Schema, model } from "mongoose";

const localizedText = {
  fr: { type: String, required: true },
  en: { type: String },
  de: { type: String },
};

const menuPageSchema = new Schema(
  {
    key: {
      type: String,
      required: [true, "Key is required"],
      trim: true,
      unique: true,
    },
    matchPath: {
      type: String,
      required: [true, "Match path is required"],
      trim: true,
    },
    title: localizedText,
    description: localizedText,
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    menuItems: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model("MenuPage", menuPageSchema);
