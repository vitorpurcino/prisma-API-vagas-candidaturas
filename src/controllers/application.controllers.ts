import { Request, Response } from "express";
import { ApplicationServices } from "../services/application.services";
import { inject, injectable } from "tsyringe";

@injectable()
export class ApplicationController {
  constructor(@inject("ApplicationServices") private services: ApplicationServices) {}

  async create(req: Request, res: Response) {
    const response = await this.services.create(
      Number(req.params.id),
      req.body
    );

    return res.status(201).json(response);
  }

  async findMany(req: Request, res: Response) {
    const response = await this.services.findMany(Number(req.params.id));

    return res.status(200).json(response);
  }
}
