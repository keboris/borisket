import { MenuPage } from "#models";
import type { RequestHandler } from "express";

export const getMenuPages: RequestHandler = async (req, res, next) => {
  try {
    const menuPages = await MenuPage.find().populate("menuItems").exec();
    if (!menuPages) {
      return res.status(404).json({ message: "Aucune page de menu trouvée" });
    }
    res.status(200).json(menuPages);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};

export const getMenuPageById: RequestHandler = async (req, res, next) => {
  try {
    const menuPage = await MenuPage.findById(req.params.id)
      .populate("menuItems")
      .exec();
    if (!menuPage) {
      return res.status(404).json({ message: "Page de menu non trouvée" });
    }
    res.status(200).json(menuPage);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};

export const createMenuPage: RequestHandler = async (req, res, next) => {
  try {
    const { key, matchPath, title, description, image, menuItems } = req.body;
    // Vérification basique des champs requis
    if (!key) {
      return res.status(400).json({ message: "La clé est requise." });
    }
    if (!matchPath) {
      return res
        .status(400)
        .json({ message: "Le chemin de correspondance est requis." });
    }
    if (!title || !title.fr) {
      return res
        .status(400)
        .json({ message: "Le titre en français est requis." });
    }
    if (!description || !description.fr) {
      return res
        .status(400)
        .json({ message: "La description en français est requise." });
    }
    if (!image) {
      return res.status(400).json({ message: "L'image est requise." });
    }
    const newMenuPage = new MenuPage({
      key,
      matchPath,
      title,
      description,
      image,
      menuItems,
    });
    const savedMenuPage = await newMenuPage.save();
    res.status(201).json(savedMenuPage);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};

export const updateMenuPage: RequestHandler = async (req, res, next) => {
  try {
    const updatedMenuPage = await MenuPage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).exec();
    if (!updatedMenuPage) {
      return res.status(404).json({ message: "Page de menu non trouvée" });
    }
    res.status(200).json(updatedMenuPage);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};

export const deleteMenuPage: RequestHandler = async (req, res, next) => {
  try {
    const deletedMenuPage = await MenuPage.findByIdAndDelete(
      req.params.id
    ).exec();
    if (!deletedMenuPage) {
      return res.status(404).json({ message: "Page de menu non trouvée" });
    }
    res.status(200).json({ message: "Page de menu supprimée avec succès" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};
