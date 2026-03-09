"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await (0, db_1.default)();
    const app = (0, app_1.default)();
    app.listen(PORT, () => {
        console.log(`\n🚀 Server running on http://localhost:${PORT}`);
        console.log(`📋 Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(`📡 Health:      http://localhost:${PORT}/health`);
        console.log(`📖 API Docs:    http://localhost:${PORT}/api-docs\n`);
    });
};
startServer().catch((err) => {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map