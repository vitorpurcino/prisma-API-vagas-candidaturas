import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  TUser,
  TUserLoginReturn,
  TUserRegister,
  TUserReturn,
  userReturnSchema,
} from "../schemas/user.schema";
import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";

@injectable()
export class UserServices {
  async register(body: TUserRegister): Promise<TUserReturn> {
    const hashPassword = await bcrypt.hash(body.password, 10);
    const newUser = {
      ...body,
      password: hashPassword,
    };

    const response = await prisma.user.create({ data: newUser });
    return userReturnSchema.parse(response);
  }

  async login(user: TUser): Promise<TUserLoginReturn> {
    const userReturn = userReturnSchema.parse(user);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    return {
      accessToken: token,
      user: userReturn,
    };
  }

  /*async login(body: TUserLoginBody): Promise<TUserLoginReturn> {
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      throw new AppError(404, "User not Registered");
    }

    const compare = await bcrypt.compare(body.password, user.password);
    
    if (!compare) {
      throw new AppError(401, "E-mail and passwod doesn't match");
    }

    const userReturn = userReturnSchema.parse(user);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    return {
      accessToken: token,
      user: userReturn,
    };
  }*/

  async getUser(id: number): Promise<TUserReturn> {
    const user = await prisma.user.findFirst({
      where: { id: id },
    });
    return userReturnSchema.parse(user);
  }
}
