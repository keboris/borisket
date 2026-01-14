import { Gallery } from "#models";
import type { RequestHandler } from "express";
import { v2 as cloudinary } from "cloudinary";

export const getGalleries: RequestHandler = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 }).lean();
    if (!images.length) {
      return res.status(404).json({ message: "No images found" });
    }
    res.status(200).json(images);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getGalleryById: RequestHandler = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id).lean();
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(image);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const createGallery: RequestHandler = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }
    const newImage = new Gallery({
      title,
      description,
    });

    const files = req.files as Express.Multer.File[] | undefined;
    const images = files?.map((file) => file.path) || [];
    const imagesPublicIds = files?.map((file) => file.filename) || [];

    const gallery = await Gallery.create({
      title,
      description,
      images: images,
      imagesPublicIds: imagesPublicIds,
    });

    res.status(201).json({ message: "Gallery created successfully", gallery });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateGallery: RequestHandler = async (req, res) => {
  try {
    const { title, description, removedImages, removedIndexes } = req.body;
    const { id } = req.params;

    const files = req.files as Express.Multer.File[] | undefined;
    const newImages = files?.map((file) => file.path) || [];
    const newImagesPublicIds = files?.map((file) => file.filename) || [];

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      if (newImagesPublicIds && newImagesPublicIds.length > 0) {
        for (const publicId of newImagesPublicIds) {
          await cloudinary.uploader.destroy(publicId);
        }
      }
      return res.status(404).json({ message: "Gallery not found" });
    }

    if (removedImages && removedImages.length > 0) {
      const publicIds = Array.isArray(removedImages)
        ? removedImages
        : removedImages
        ? [removedImages]
        : [];

      for (const publicId of publicIds) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    if (removedIndexes && removedIndexes.length > 0) {
      gallery.images = gallery.images.filter(
        (_, index) => !removedIndexes.includes(index.toString())
      );
      gallery.imagesPublicIds = gallery.imagesPublicIds.filter(
        (_, index) => !removedIndexes.includes(index.toString())
      );
      await gallery.save();
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      {
        title,
        description,
        images:
          gallery.images.length > 0
            ? gallery.images.concat(newImages)
            : gallery.images,
        imagesPublicIds:
          gallery.imagesPublicIds.length > 0
            ? gallery.imagesPublicIds.concat(newImagesPublicIds)
            : gallery.imagesPublicIds,
      },
      { new: true }
    );

    if (!updatedGallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    res.status(200).json({
      message: "Gallery updated successfully",
      gallery: updatedGallery,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteGallery: RequestHandler = async (req, res) => {
  try {
    const deletedImage = await Gallery.findByIdAndDelete(req.params.id).exec();
    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
