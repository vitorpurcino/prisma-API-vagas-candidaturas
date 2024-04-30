import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import {
  TOpportunity,
  TOpportunityCreate,
  TOpportunityUpdate,
} from "../schemas/opportunity.schemas";

@injectable()
export class OpportunityServices {
  async create(body: TOpportunityCreate, userId: number): Promise<TOpportunity> {
    const newUser = {...body, userId}
    const data = await prisma.opportunity.create({ data: newUser });
    return data;
  }

  findOne(opportunity: TOpportunity):TOpportunity {
    return opportunity
  }

  async findMany(userId?: number): Promise<TOpportunity[]> {
    const data = await prisma.opportunity.findMany({where: {userId: userId}});
    return data;
  }

  async update(opportunityId: number, body: TOpportunityUpdate): Promise<TOpportunity> {
    const data = await prisma.opportunity.update({where:{id: opportunityId}, data: body});
    return data
  }

  async delete(opportunityId: number) {
    const data = await prisma.opportunity.delete({where: {id: opportunityId}})
    return data;
  }
}
