"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_schema_1 = require("../schemas/user.schema");
const tsyringe_1 = require("tsyringe");
const prisma_1 = require("../database/prisma");
let UserServices = class UserServices {
    async register(body) {
        const hashPassword = await bcrypt_1.default.hash(body.password, 10);
        const newUser = {
            ...body,
            password: hashPassword,
        };
        const response = await prisma_1.prisma.user.create({ data: newUser });
        return user_schema_1.userReturnSchema.parse(response);
    }
    async login(user) {
        const userReturn = user_schema_1.userReturnSchema.parse(user);
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        return {
            accessToken: token,
            user: userReturn,
        };
    }
    /*async login(body: TUserLoginBody): Promise<TUserLoginReturn> {
      const user = await prisma.user.findFirst({
        where: { email: body.email },
      });
  
      if (!user) {
        throw new AppError(404, "User not Registered");
      }
  
      const compare = await bcrypt.compare(body.password, user.password);
      
      if (!compare) {
        throw new AppError(401, "E-mail and passwod doesn't match");
      }
  
      const userReturn = userReturnSchema.parse(user);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
  
      return {
        accessToken: token,
        user: userReturn,
      };
    }*/
    async getUser(id) {
        const user = await prisma_1.prisma.user.findFirst({
            where: { id: id },
        });
        return user_schema_1.userReturnSchema.parse(user);
    }
};
exports.UserServices = UserServices;
exports.UserServices = UserServices = __decorate([
    (0, tsyringe_1.injectable)()
], UserServices);
