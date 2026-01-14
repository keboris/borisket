import { Menu } from "#models";
import type { RequestHandler } from "express";

export const getMenus: RequestHandler = async (req, res, next) => {
  try {
    const menus = await Menu.find().sort({ order: 1 }).exec();
    if (!menus) {
      return res.status(404).json({ message: "Aucun menu trouvé" });
    }
    res.status(200).json(menus);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};

export const getMenuById: RequestHandler = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id).exec();
    if (!menu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }
    res.status(200).json(menu);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};

export const getMenusByParentId: RequestHandler = async (req, res, next) => {
  try {
    const parentId =
      req.params.parentId === "null" ? null : req.params.parentId;
    const menus = await Menu.find({ parentId }).sort({ order: 1 }).exec();
    if (!menus) {
      return res
        .status(404)
        .json({ message: "Aucun menu trouvé pour ce parentId" });
    }
    res.status(200).json(menus);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};

// Controller pour créer un menu
export const createMenu: RequestHandler = async (req, res, next) => {
  try {
    const {
      name,
      parentId,
      order,
      icon,
      path,
      color,
      glow,
      external = false,
    } = req.body;

    // Vérification basique des champs requis
    if (!name || !name.fr) {
      return res
        .status(400)
        .json({ message: "Le nom en français est requis." });
    }
    if (!icon) {
      return res.status(400).json({ message: "L'icône est requise." });
    }
    if (!path) {
      return res.status(400).json({ message: "Le chemin (path) est requis." });
    }
    if (!color) {
      return res.status(400).json({ message: "La couleur est requise." });
    }
    if (!glow) {
      return res.status(400).json({ message: "La lueur est requise." });
    }

    // Compte selon le niveau (racine ou sous-menu)
    const menuCount = await Menu.countDocuments({
      parentId: parentId ?? null,
    });

    // Création du menu
    const newMenu = new Menu({
      name,
      parentId: parentId ?? null,
      order:
        !order ||
        typeof order !== "number" ||
        isNaN(order) ||
        order < 1 ||
        order > menuCount + 1
          ? menuCount + 1
          : order,
      icon,
      path,
      color,
      glow,
      external,
    });

    await newMenu.save();

    res.status(201).json({
      message: "Menu créé avec succès",
      menu: newMenu,
    });
  } catch (error: any) {
    // Gestion d'erreur pour doublon (ordre unique)
    if (error.code === 11000 && error.keyPattern?.order) {
      return res
        .status(400)
        .json({ message: "Un menu avec cet ordre existe déjà." });
    }

    console.error("Erreur création menu:", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la création du menu." });
  }
};

// Controller pour mettre à jour un menu
export const updateMenu: RequestHandler = async (req, res, next) => {
  try {
    const menuId = req.params.id;
    const { name, parentId, order, icon, path, color, glow, external } =
      req.body;

    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { name, parentId, order, icon, path, color, glow, external },
      { new: true }
    );
    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }
    res
      .status(200)
      .json({ message: "Menu mis à jour avec succès", menu: updatedMenu });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};

export const updateMenuOrder: RequestHandler = async (req, res, next) => {
  try {
    const menuId = req.params.id;
    const { order } = req.body;

    const searchMenu = await Menu.findOne({ order });
    const menusCount = await Menu.countDocuments();

    const currentOrderMenu = await Menu.findById(menuId);
    if (!currentOrderMenu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    if (order < 1 || order > menusCount) {
      return res.status(400).json({
        message: `L'ordre doit être compris entre 1 et ${menusCount}`,
      });
    }

    if (searchMenu && searchMenu._id.toString() === menuId) {
      return res.status(200).json({
        message: "L'ordre du menu est déjà à cette valeur",
        menu: currentOrderMenu,
      });
    }

    if (searchMenu && searchMenu._id.toString() !== menuId) {
      searchMenu.order = currentOrderMenu.order;
      await searchMenu.save();
    }

    currentOrderMenu.order = order;
    await currentOrderMenu.save();

    const updatedMenu = await Menu.findById(menuId);
    res.status(200).json({
      message: "Ordre du menu mis à jour avec succès",
      menu: updatedMenu,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};
// Controller pour supprimer un menu
export const deleteMenu: RequestHandler = async (req, res, next) => {
  try {
    const menuId = req.params.id;
    const deletedMenu = await Menu.findByIdAndDelete(menuId);
    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }
    res.status(200).json({ message: "Menu supprimé avec succès" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Erreur serveur inconnue" });
    }
  }
};
