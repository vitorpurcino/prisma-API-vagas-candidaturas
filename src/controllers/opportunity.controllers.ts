import { Request, Response, response } from "express";
import { OpportunityServices } from "../services/opportunity.services";
import { inject, injectable } from "tsyringe";

@injectable()
export class OpportunityController {
  constructor(
    @inject("OpportunityServices") private services: OpportunityServices
  ) {}

  async create(req: Request, res: Response) {
    const userId = res.locals.decode.id
    const response = await this.services.create(req.body, userId);
    return res.status(201).json(response);
  }

  async findMany(req: Request, res: Response) {
    const id = res.locals.decode?.id;
    const response = await this.services.findMany(id);
    return res.status(200).json(response);
  }

  findOne(req: Request, res: Response) {
    const response = this.services.findOne(res.locals.opportunity);
    return res.status(200).json(response);
  }

  async update(req: Request, res: Response) {
    const response = await this.services.update(
      Number(req.params.id),
      req.body
    );
    return res.status(200).json(response);
  }

  async delete(req: Request, res: Response) {
    const response = await this.services.delete(Number(req.params.id));
    return res.status(204).json(response);
  }
}
