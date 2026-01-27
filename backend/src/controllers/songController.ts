import { Song } from "#models";
import type { RequestHandler } from "express";

export const getSongs: RequestHandler = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ releaseDate: -1 });
    if (!songs) {
      return res.status(404).json({ message: "No songs found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown server error" });
    }
  }
};

export const getSingles: RequestHandler = async (req, res, next) => {
  try {
    const songs = await Song.find({ type: "single" }).sort({ releaseDate: -1 });
    if (!songs) {
      return res.status(404).json({ message: "No songs found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown server error" });
    }
  }
};

export const getAlbums: RequestHandler = async (req, res, next) => {
  try {
    const songs = await Song.find({ type: "album" }).sort({ releaseDate: -1 });
    if (!songs) {
      return res.status(404).json({ message: "No albums found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown server error" });
    }
  }
};

export const getClips: RequestHandler = async (req, res, next) => {
  try {
    const songs = await Song.find({ available_video: true }).sort({
      releaseDate: -1,
    });
    if (!songs) {
      return res.status(404).json({ message: "No clips found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown server error" });
    }
  }
};

export const getLyrics: RequestHandler = async (req, res, next) => {
  try {
    const songs = await Song.find({ available_lyrics: true }).sort({
      releaseDate: -1,
    });
    if (!songs) {
      return res.status(404).json({ message: "No lyrics found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown server error" });
    }
  }
};

export const createSong: RequestHandler = async (req, res, next) => {
  try {
    const {
      title,
      artist,
      feat,
      coverImage,
      releaseDate,
      genre,
      type,
      audioFile,
      duration,
      previewFile,
      previewDuration,
      lyrics,
      lyricsFile,
      codeYouTube,
      details,
      available_audio,
      available_video,
      available_lyrics,
      links,
      inPlaylist,
      buyLink,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }
    const newSong = new Song({
      title,
      artist,
      feat,
      coverImage,
      releaseDate,
      genre,
      type,
      audioFile,
      duration,
      previewFile,
      previewDuration,
      lyrics,
      lyricsFile,
      codeYouTube,
      details,
      available_audio,
      available_video,
      available_lyrics,
      links,
      inPlaylist,
      buyLink,
    });
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown server error" });
    }
  }
};

export const getSongById: RequestHandler = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id).exec();
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown server error" });
    }
  }
};

export const getSongBySlug: RequestHandler = async (req, res, next) => {
  try {
    const song = await Song.findOne({ slug: req.params.slug }).exec();
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown server error" });
    }
  }
};

export const updateSong: RequestHandler = async (req, res, next) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(updatedSong);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown server error" });
    }
  }
};

export const deleteSong: RequestHandler = async (req, res, next) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id).exec();
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown server error" });
    }
  }
};
