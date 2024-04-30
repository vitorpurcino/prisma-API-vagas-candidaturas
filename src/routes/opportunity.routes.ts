import { Router } from "express";
import { OpportunityController } from "../controllers/opportunity.controllers";
import { applicationRouter } from "./application.routes";
import { ValidateBody } from "../middlewares/validateBody.middlewares";
import {
  opportunityCreateSchema,
  opportunityUpdateSchema,
} from "../schemas/opportunity.schemas";
import { IsOpportunityIDValid } from "../middlewares/IsOpportunityIDValid.middlewares";
import { container } from "tsyringe";
import { OpportunityServices } from "../services/opportunity.services";
import { ValidyToken } from "../middlewares/validateToken.middleware";
import { isOpportunityOwner } from "../middlewares/isOpportunityOwner.middleware";

container.registerSingleton("OpportunityServices", OpportunityServices);
const opportunityController = container.resolve(OpportunityController);

export const opportunityRouter = Router();

opportunityRouter.use("/:id", IsOpportunityIDValid.execute);

opportunityRouter.get("/", (req, res) =>
  opportunityController.findMany(req, res)
);
opportunityRouter.get(
  "/users",
  ValidyToken.execute,
  isOpportunityOwner.execute,
  (req, res) => opportunityController.findMany(req, res)
);
opportunityRouter.get("/:id", ValidyToken.execute, (req, res) =>
  opportunityController.findOne(req, res)
);
opportunityRouter.post(
  "/",
  ValidateBody.execute(opportunityCreateSchema),
  ValidyToken.execute,
  (req, res) => opportunityController.create(req, res)
);
opportunityRouter.patch(
  "/:id",
  ValidateBody.execute(opportunityUpdateSchema),
  isOpportunityOwner.execute,
  (req, res) => opportunityController.update(req, res)
);
opportunityRouter.delete(
  "/:id",
  ValidyToken.execute,
  isOpportunityOwner.execute,
  (req, res) => opportunityController.delete(req, res)
);

opportunityRouter.use("/", applicationRouter);
