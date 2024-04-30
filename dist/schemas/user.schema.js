"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReturnSchema = exports.userLoginBodySchema = exports.userRegisterBodySchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(3).max(255),
    email: zod_1.z.string().min(3).max(255).email(),
    password: zod_1.z.string().min(3).max(8),
});
exports.userRegisterBodySchema = exports.userSchema.omit({ id: true });
exports.userLoginBodySchema = exports.userSchema.pick({
    email: true,
    password: true,
});
exports.userReturnSchema = exports.userSchema.omit({ password: true });
