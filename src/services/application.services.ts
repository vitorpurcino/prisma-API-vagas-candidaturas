import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TApplication, TApplicationCreate } from "../schemas/application.schemas";

@injectable()
export class ApplicationServices {
  async create(opportunityId: number, body: TApplicationCreate): Promise<TApplication> {
    const data = await prisma.application.create({data: {opportunityId, ...body}})
    return data;
  }

  async findMany(opportunityId: number): Promise<TApplication[]> {
    const data = await prisma.application.findMany({where: {opportunityId: opportunityId}})
    return data;
  }
}
