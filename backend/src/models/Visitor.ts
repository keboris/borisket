import { Schema, model } from "mongoose";

const visitorSchema = new Schema(
  {
    ipAddress: {
      type: String,
      required: [true, "IP address is required"],
      unique: true,
      trim: true,
    },
    webId: {
      type: String,
      required: [true, "Web ID is required"],
      unique: true,
      trim: true,
    },
    visitCount: {
      type: Number,
      default: 1,
    },
    firstVisit: {
      type: Date,
      default: Date.now,
    },
    lastVisit: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

export default model("Visitor", visitorSchema);
