import {
  getMenuPages,
  createMenuPage,
  getMenuPageById,
  updateMenuPage,
  deleteMenuPage,
} from "#controllers";
import { authenticate, authorize } from "#middlewares";
import { MenuPage } from "#models";
import { Router } from "express";

const menuPageRoutes = Router();

menuPageRoutes.get("/", getMenuPages);

/*menuPageRoutes.post("/", authenticate, authorize(MenuPage), createMenuPage);

menuPageRoutes.get("/:id", getMenuPageById);
menuPageRoutes.put("/:id", authenticate, authorize(MenuPage), updateMenuPage);
menuPageRoutes.delete(
  "/:id",
  authenticate,
  authorize(MenuPage),
  deleteMenuPage
);*/

menuPageRoutes.post("/", createMenuPage);

menuPageRoutes.get("/:id", getMenuPageById);
menuPageRoutes.put("/:id", updateMenuPage);
menuPageRoutes.delete("/:id", deleteMenuPage);

export default menuPageRoutes;
