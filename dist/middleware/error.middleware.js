"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.notFound = void 0;
const response_1 = require("../utils/response");
const notFound = (req, res) => {
    (0, response_1.sendError)(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
};
exports.notFound = notFound;
const globalErrorHandler = (err, _req, res, _next) => {
    console.error('❌ Unhandled error:', err);
    (0, response_1.sendError)(res, err.message || 'Internal server error.', 500);
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=error.middleware.js.map