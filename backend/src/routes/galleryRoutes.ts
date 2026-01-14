import {
  getGalleries,
  createGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "#controllers";
import { authenticate, authorize, upload, validateBodyZod } from "#middlewares";
import { Gallery } from "#models";
import { galleryUpdateSchema } from "#schemas";
import { Router } from "express";

const galleryRoutes = Router();

galleryRoutes.get("/", getGalleries);

galleryRoutes.post("/", authenticate, authorize(Gallery), createGallery);

galleryRoutes.get("/:id", getGalleryById);

galleryRoutes.put(
  "/:id",
  authenticate,
  authorize(Gallery),
  upload.array("image", 10),
  validateBodyZod(galleryUpdateSchema),
  updateGallery
);
galleryRoutes.delete("/:id", authenticate, authorize(Gallery), deleteGallery);
export default galleryRoutes;
