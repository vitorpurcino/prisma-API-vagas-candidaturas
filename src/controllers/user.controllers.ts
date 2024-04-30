import { inject, injectable } from "tsyringe";
import { UserServices } from "../services/user.services";
import { Request, Response } from "express";

@injectable()
export class UserControllers {
  constructor(@inject("UserServices") private services: UserServices) {}

  async register(req: Request, res: Response): Promise<Response> {
    const response = await this.services.register(req.body);
    return res.status(201).json(response);
  }
  async login(req: Request, res: Response): Promise<Response> {
    const response = await this.services.login(res.locals.user);
    return res.status(200).json(response);
  }
  async getUser(req: Request, res: Response): Promise<Response> {
    const idUser = res.locals.decode.id;
    const response = await this.services.getUser(idUser);

    return res.status(200).json(response);
  }
}
