"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const profile_routes_1 = __importDefault(require("./modules/profile/profile.routes"));
const category_routes_1 = __importDefault(require("./modules/category/category.routes"));
const skill_routes_1 = __importDefault(require("./modules/skill/skill.routes"));
const experience_routes_1 = __importDefault(require("./modules/experience/experience.routes"));
const education_routes_1 = __importDefault(require("./modules/education/education.routes"));
const project_routes_1 = __importDefault(require("./modules/project/project.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const swagger_1 = __importDefault(require("./config/swagger"));
require("./modules/user/user.swagger"); // register JSDoc annotations
require("./modules/profile/profile.swagger"); // register JSDoc annotations
require("./modules/category/category.swagger"); // register JSDoc annotations
require("./modules/skill/skill.swagger"); // register JSDoc annotations
require("./modules/experience/experience.swagger"); // register JSDoc annotations
require("./modules/education/education.swagger"); // register JSDoc annotations
require("./modules/project/project.swagger"); // register JSDoc annotations
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const app = (0, express_1.default)();
// ─── Global Middleware ──────────────────────────────────────────────────────
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express_1.default.json({ limit: "10kb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// ─── Static Files ─────────────────────────────────────────────────────────────
// Serve the uploads directory to make images/CVs accessible via URL
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// ─── Health Check ───────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
    res
        .status(200)
        .json({ success: true, message: "🚀 Portfolio API is running." });
});
// ─── Swagger Docs ────────────────────────────────────────────────────────────
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default, {
    customSiteTitle: "Portfolio API Docs",
    swaggerOptions: {
        persistAuthorization: true, // keep the JWT token across page refreshes
    },
}));
// ─── API Routes ─────────────────────────────────────────────────────────────
app.use("/api/users", user_routes_1.default);
app.use("/api/profile", profile_routes_1.default);
app.use("/api/categories", category_routes_1.default);
app.use("/api/skills", skill_routes_1.default);
app.use("/api/experiences", experience_routes_1.default);
app.use("/api/education", education_routes_1.default);
app.use("/api/projects", project_routes_1.default);
// ─── Error Handlers ─────────────────────────────────────────────────────────
app.use(error_middleware_1.notFound);
app.use(error_middleware_1.globalErrorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`📡 Health:      http://localhost:${PORT}/health`);
    console.log(`📖 API Docs:    http://localhost:${PORT}/api-docs\n`);
});
//# sourceMappingURL=app.js.map