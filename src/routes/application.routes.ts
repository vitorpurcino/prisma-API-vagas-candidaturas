import { Router } from "express";
import { ApplicationController } from "../controllers/application.controllers";
import { ValidateBody } from "../middlewares/validateBody.middlewares";
import { applicationCreateSchema } from "../schemas/application.schemas";
import { container } from "tsyringe";
import { ApplicationServices } from "../services/application.services";

container.registerSingleton("ApplicationServices", ApplicationServices);
const applicationController = container.resolve(ApplicationController);

export const applicationRouter = Router();

applicationRouter.post("/:id/applications",  ValidateBody.execute(applicationCreateSchema), (req, res) => applicationController.create(req, res));
applicationRouter.get("/:id/applications", (req, res) => applicationController.findMany(req, res));
