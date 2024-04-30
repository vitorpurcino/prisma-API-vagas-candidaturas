import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appErrors";
import bcrypt from "bcrypt";

export class UserLogin {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      throw new AppError(404, "User not Registered");
    }

    const compare = await bcrypt.compare(req.body.password, user.password);

    if (!compare) {
      throw new AppError(401, "E-mail and passwod doesn't match");
    }

    res.locals.user = user;
    next();
  }
}
