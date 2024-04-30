"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOpportunityIDValid = void 0;
const prisma_1 = require("../database/prisma");
const appErrors_1 = require("../errors/appErrors");
class IsOpportunityIDValid {
    static async execute(req, res, next) {
        const id = req.params.id;
        const opportunity = await prisma_1.prisma.opportunity.findFirst({
            where: { id: Number(id) },
        });
        if (!opportunity) {
            throw new appErrors_1.AppError(404, "Opportunity not found");
        }
        res.locals.opportunity = opportunity;
        next();
    }
}
exports.IsOpportunityIDValid = IsOpportunityIDValid;
