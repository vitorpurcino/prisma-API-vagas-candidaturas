"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appErrors_1 = require("../errors/appErrors");
class ValidyToken {
    static execute(req, res, next) {
        const authorization = req.headers.authorization;
        const token = authorization?.replace("Bearer ", "");
        const secret = process.env.JWT_SECRET;
        if (!token) {
            throw new appErrors_1.AppError(401, "Token in required");
        }
        jsonwebtoken_1.default.verify(token, secret);
        res.locals.decode = jsonwebtoken_1.default.decode(token);
        console.log(jsonwebtoken_1.default.decode(token));
        next();
    }
}
exports.ValidyToken = ValidyToken;
