"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const tsyringe_1 = require("tsyringe");
const user_services_1 = require("../services/user.services");
let UserControllers = class UserControllers {
    services;
    constructor(services) {
        this.services = services;
    }
    async register(req, res) {
        const response = await this.services.register(req.body);
        return res.status(201).json(response);
    }
    async login(req, res) {
        const response = await this.services.login(res.locals.user);
        return res.status(200).json(response);
    }
    async getUser(req, res) {
        const idUser = res.locals.decode.id;
        const response = await this.services.getUser(idUser);
        return res.status(200).json(response);
    }
};
exports.UserControllers = UserControllers;
exports.UserControllers = UserControllers = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserServices")),
    __metadata("design:paramtypes", [user_services_1.UserServices])
], UserControllers);
