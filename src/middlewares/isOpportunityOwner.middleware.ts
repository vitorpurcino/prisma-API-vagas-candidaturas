import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appErrors";

export class isOpportunityOwner {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.decode.id;
    const opportunityId = req.params.id;
    const opportunity = await prisma.opportunity.findFirst({
      where: { id: Number(opportunityId) },
    });

    if (opportunity?.userId !== userId) {
      throw new AppError(401, "This Opportunity is not yours");
    }
    next();
  }
}
