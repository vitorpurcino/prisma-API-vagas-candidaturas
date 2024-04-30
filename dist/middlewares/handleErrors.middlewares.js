"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleErrors = void 0;
const appErrors_1 = require("../errors/appErrors");
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
class HandleErrors {
    static execute(error, req, res, next) {
        if (error instanceof appErrors_1.AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        if (error instanceof zod_1.ZodError) {
            return res.status(422).json(error);
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return res.status(401).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}
exports.HandleErrors = HandleErrors;
