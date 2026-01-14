import {
  getSongs,
  createSong,
  getSongById,
  updateSong,
  deleteSong,
  getSingles,
  getAlbums,
  getClips,
  getLyrics,
} from "#controllers";
import { authenticate, authorize } from "#middlewares";
import { Song } from "#models";
import { Router } from "express";

const songRoutes = Router();

songRoutes.get("/", getSongs);
songRoutes.get("/singles", getSingles);
songRoutes.get("/albums", getAlbums);
songRoutes.get("/clips", getClips);
songRoutes.get("/lyrics", getLyrics);

/*songRoutes.post("/", authenticate, authorize(Song), createSong);

songRoutes.get("/:id", getSongById);

songRoutes.put("/:id", authenticate, authorize(Song), updateSong);
songRoutes.delete("/:id", authenticate, authorize(Song), deleteSong);
*/

songRoutes.post("/", createSong);

songRoutes.get("/:id", getSongById);
songRoutes.put("/:id", updateSong);
songRoutes.delete("/:id", deleteSong);

export default songRoutes;
