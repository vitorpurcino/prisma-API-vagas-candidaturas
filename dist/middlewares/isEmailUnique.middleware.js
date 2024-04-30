"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmailUnique = void 0;
const prisma_1 = require("../database/prisma");
const appErrors_1 = require("../errors/appErrors");
class IsEmailUnique {
    static async execute(req, res, next) {
        const user = await prisma_1.prisma.user.findFirst({
            where: { email: req.body.email },
        });
        if (user) {
            throw new appErrors_1.AppError(403, "E-mail already registered");
        }
        next();
    }
}
exports.IsEmailUnique = IsEmailUnique;
