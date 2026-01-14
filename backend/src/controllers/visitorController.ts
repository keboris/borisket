import { Visitor } from "#models";
import type { RequestHandler } from "express";

export const getVisitors: RequestHandler = async (req, res, next) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    if (!visitors) {
      return res.status(404).json({ message: "Aucun visiteur trouvé" });
    }
    res.status(200).json({ visitors });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Une erreur inconnue est survenue" });
    }
  }
};

export const getVisitorById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const visitor = await Visitor.findById(id);
    if (!visitor) {
      return res.status(404).json({ message: "Visiteur non trouvé" });
    }
    res.status(200).json({ visitor });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Une erreur inconnue est survenue" });
    }
  }
};

export const createVisitor: RequestHandler = async (req, res, next) => {
  try {
    const { ipAddress, userAgent } = req.body;
    const newVisitor = new Visitor({ ipAddress, userAgent });
    await newVisitor.save();
    res
      .status(201)
      .json({ message: "Visiteur créé avec succès", visitor: newVisitor });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Une erreur inconnue est survenue" });
    }
  }
};

export const deleteVisitor: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedVisitor = await Visitor.findByIdAndDelete(id);
    if (!deletedVisitor) {
      return res.status(404).json({ message: "Visiteur non trouvé" });
    }
    res
      .status(200)
      .json({
        message: "Visiteur supprimé avec succès",
        visitor: deletedVisitor,
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Une erreur inconnue est survenue" });
    }
  }
};
