import {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenusByParentId,
} from "#controllers";
import { authenticate, authorize } from "#middlewares";
import { Menu } from "#models";
import { Router } from "express";

const menuRoutes = Router();

menuRoutes.get("/", getMenus);
menuRoutes.get("/parent/:parentId", getMenusByParentId);
/*menuRoutes.post("/", authenticate, authorize(Menu), createMenu);

menuRoutes.get("/:id", getMenuById);
menuRoutes.put("/:id", authenticate, authorize(Menu), updateMenu);
menuRoutes.delete("/:id", authenticate, authorize(Menu), deleteMenu);*/

menuRoutes.post("/", createMenu);

menuRoutes.get("/:id", getMenuById);
menuRoutes.put("/:id", updateMenu);
menuRoutes.delete("/:id", deleteMenu);

export default menuRoutes;
