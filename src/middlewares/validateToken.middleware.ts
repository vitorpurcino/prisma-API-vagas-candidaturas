import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appErrors";

export class ValidyToken {
  static execute(req: Request, res: Response, next: NextFunction) {
    
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET as string;

    if (!token) {
      throw new AppError(401, "Token in required");
    }

    jwt.verify(token, secret);

    res.locals.decode = jwt.decode(token);

    console.log(jwt.decode(token));

    next();
  }
}
