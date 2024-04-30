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
exports.OpportunityController = void 0;
const opportunity_services_1 = require("../services/opportunity.services");
const tsyringe_1 = require("tsyringe");
let OpportunityController = class OpportunityController {
    services;
    constructor(services) {
        this.services = services;
    }
    async create(req, res) {
        const userId = res.locals.decode.id;
        const response = await this.services.create(req.body, userId);
        return res.status(201).json(response);
    }
    async findMany(req, res) {
        const id = res.locals.decode?.id;
        const response = await this.services.findMany(id);
        return res.status(200).json(response);
    }
    findOne(req, res) {
        const response = this.services.findOne(res.locals.opportunity);
        return res.status(200).json(response);
    }
    async update(req, res) {
        const response = await this.services.update(Number(req.params.id), req.body);
        return res.status(200).json(response);
    }
    async delete(req, res) {
        const response = await this.services.delete(Number(req.params.id));
        return res.status(204).json(response);
    }
};
exports.OpportunityController = OpportunityController;
exports.OpportunityController = OpportunityController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("OpportunityServices")),
    __metadata("design:paramtypes", [opportunity_services_1.OpportunityServices])
], OpportunityController);
