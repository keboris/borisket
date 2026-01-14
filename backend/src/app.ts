import express from "express";
import "#db";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  authRoutes,
  galleryRoutes,
  menuPageRoutes,
  menuRoutes,
  songRoutes,
  userRoutes,
  visitorRoutes,
} from "#routes";
import { errorHandler } from "#middlewares";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes

// Authentication
app.use("/auth", authRoutes);

// Users
app.use("/users", userRoutes);

// Visitors
app.use("/visitors", visitorRoutes);

// Menus and Menu Pages
app.use("/menus", menuRoutes);
app.use("/menu-pages", menuPageRoutes);

// Songs
app.use("/songs", songRoutes);

// Galleries
app.use("/galleries", galleryRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`\x1b[34mMain app listening at http://localhost:${port}\x1b[0m`);
  console.log(
    `\x1b[32mSwagger UI available at http://localhost:${port}/api-docs\x1b[0m`
  );
});
