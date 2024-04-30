import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/user.services";
import { UserControllers } from "../controllers/user.controllers";
import { ValidateBody } from "../middlewares/validateBody.middlewares";
import {
  userLoginBodySchema,
  userRegisterBodySchema,
} from "../schemas/user.schema";
import { ValidyToken } from "../middlewares/validateToken.middleware";
import { IsEmailUnique } from "../middlewares/isEmailUnique.middleware";
import { UserLogin } from "../middlewares/UserLogin.middleware";

container.registerSingleton("UserServices", UserServices);

const userControllers = container.resolve(UserControllers);

export const userRoutes = Router();

userRoutes.post(
  "/",
  ValidateBody.execute(userRegisterBodySchema),
  IsEmailUnique.execute,
  (req, res) => {
    userControllers.register(req, res);
  }
);
userRoutes.post(
  "/login",
  ValidateBody.execute(userLoginBodySchema),
  UserLogin.execute,
  (req, res) => {
    userControllers.login(req, res);
  }
);
userRoutes.get("/", ValidyToken.execute, (req, res) => {
  userControllers.getUser(req, res);
});
