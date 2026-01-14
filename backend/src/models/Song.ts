import { Schema, model } from "mongoose";

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Titre est requis"],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, "Artiste est requis"],
      default: "Boris Ket",
      trim: true,
    },
    feat: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, "Image de couverture est requise"],
      trim: true,
    },
    releaseDate: {
      type: Date,
      required: [true, "Date de sortie est requise"],
      default: Date.now,
    },
    genres: {
      type: [String],
      required: [true, "Genre est requis"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["single", "album", "ep"],
      default: "single",
      required: [true, "Type est requis"],
    },
    audioFile: {
      type: String,
      required: [true, "Fichier audio est requis"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Durée est requise"],
    },
    previewFile: {
      type: String,
      trim: true,
    },
    previewDuration: {
      type: Number,
    },
    lyrics: {
      type: String,
      trim: true,
    },
    lyricsFile: {
      type: String,
      trim: true,
    },
    codeYouTube: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    available_audio: {
      type: Boolean,
      default: false,
    },
    available_video: {
      type: Boolean,
      default: false,
    },
    available_lyrics: {
      type: Boolean,
      default: false,
    },
    links: {
      spotify: {
        type: String,
        trim: true,
      },
      apple: {
        type: String,
        trim: true,
      },
      youtube: {
        type: String,
        trim: true,
      },
      other: {
        type: String,
        trim: true,
      },
    },
    inPlaylist: {
      type: Boolean,
      default: false,
    },
    buyLink: {
      type: String,
      required: [true, "Buy link is required"],
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default model("Song", songSchema);
