import {
  createVisitor,
  deleteVisitor,
  getVisitorById,
  getVisitors,
} from "#controllers";
import { Router } from "express";

const visitorRoutes = Router();

visitorRoutes.get("/", getVisitors);
visitorRoutes.post("/", createVisitor);

visitorRoutes.get("/:id", getVisitorById);

visitorRoutes.delete("/:id", deleteVisitor);

export default visitorRoutes;
