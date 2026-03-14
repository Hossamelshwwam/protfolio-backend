import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./modules/user/user.routes";
import profileRoutes from "./modules/profile/profile.routes";
import categoryRoutes from "./modules/category/category.routes";
import skillRoutes from "./modules/skill/skill.routes";
import experienceRoutes from "./modules/experience/experience.routes";
import educationRoutes from "./modules/education/education.routes";
import projectRoutes from "./modules/project/project.routes";
import { notFound, globalErrorHandler } from "./middleware/error.middleware";
import swaggerSpec from "./config/swagger";
import "./modules/user/user.swagger"; // register JSDoc annotations
import "./modules/profile/profile.swagger"; // register JSDoc annotations
import "./modules/category/category.swagger"; // register JSDoc annotations
import "./modules/skill/skill.swagger"; // register JSDoc annotations
import "./modules/experience/experience.swagger"; // register JSDoc annotations
import "./modules/education/education.swagger"; // register JSDoc annotations
import "./modules/project/project.swagger"; // register JSDoc annotations
import "dotenv/config";

const app = express();

// ─── Global Middleware ──────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ───────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res
    .status(200)
    .json({ success: true, message: "🚀 Portfolio API is running." });
});

// ─── Swagger Docs ────────────────────────────────────────────────────────────
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Portfolio API Docs",
    swaggerOptions: {
      persistAuthorization: true, // keep the JWT token across page refreshes
    },
  }),
);

// ─── API Routes ─────────────────────────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/projects", projectRoutes);

// ─── Error Handlers ─────────────────────────────────────────────────────────
app.use(notFound);
app.use(globalErrorHandler);

export default app;
