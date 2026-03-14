"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const startServer = async () => {
    await (0, db_1.default)();
};
startServer().catch((err) => {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map