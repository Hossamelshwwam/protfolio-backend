"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const response_1 = require("../utils/response");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errors = error.errors.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            }));
            (0, response_1.sendError)(res, 'Validation failed.', 422, errors);
            return;
        }
        (0, response_1.sendError)(res, 'Unexpected validation error.', 500);
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map