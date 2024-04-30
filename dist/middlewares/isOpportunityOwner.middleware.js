"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOpportunityOwner = void 0;
const prisma_1 = require("../database/prisma");
const appErrors_1 = require("../errors/appErrors");
class isOpportunityOwner {
    static async execute(req, res, next) {
        const userId = res.locals.decode.id;
        const opportunityId = req.params.id;
        const opportunity = await prisma_1.prisma.opportunity.findFirst({
            where: { id: Number(opportunityId) },
        });
        if (opportunity?.userId !== userId) {
            throw new appErrors_1.AppError(401, "This Opportunity is not yours");
        }
        next();
    }
}
exports.isOpportunityOwner = isOpportunityOwner;
