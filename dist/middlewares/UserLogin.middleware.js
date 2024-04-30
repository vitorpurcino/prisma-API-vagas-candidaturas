"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = void 0;
const prisma_1 = require("../database/prisma");
const appErrors_1 = require("../errors/appErrors");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserLogin {
    static async execute(req, res, next) {
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            throw new appErrors_1.AppError(404, "User not Registered");
        }
        const compare = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!compare) {
            throw new appErrors_1.AppError(401, "E-mail and passwod doesn't match");
        }
        res.locals.user = user;
        next();
    }
}
exports.UserLogin = UserLogin;
