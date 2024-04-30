"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunityServices = void 0;
const tsyringe_1 = require("tsyringe");
const prisma_1 = require("../database/prisma");
let OpportunityServices = class OpportunityServices {
    async create(body, userId) {
        const newUser = { ...body, userId };
        const data = await prisma_1.prisma.opportunity.create({ data: newUser });
        return data;
    }
    findOne(opportunity) {
        return opportunity;
    }
    async findMany(userId) {
        const data = await prisma_1.prisma.opportunity.findMany({ where: { userId: userId } });
        return data;
    }
    async update(opportunityId, body) {
        const data = await prisma_1.prisma.opportunity.update({ where: { id: opportunityId }, data: body });
        return data;
    }
    async delete(opportunityId) {
        const data = await prisma_1.prisma.opportunity.delete({ where: { id: opportunityId } });
        return data;
    }
};
exports.OpportunityServices = OpportunityServices;
exports.OpportunityServices = OpportunityServices = __decorate([
    (0, tsyringe_1.injectable)()
], OpportunityServices);
