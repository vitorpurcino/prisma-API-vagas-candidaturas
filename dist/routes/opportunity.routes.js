"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opportunityRouter = void 0;
const express_1 = require("express");
const opportunity_controllers_1 = require("../controllers/opportunity.controllers");
const application_routes_1 = require("./application.routes");
const validateBody_middlewares_1 = require("../middlewares/validateBody.middlewares");
const opportunity_schemas_1 = require("../schemas/opportunity.schemas");
const IsOpportunityIDValid_middlewares_1 = require("../middlewares/IsOpportunityIDValid.middlewares");
const tsyringe_1 = require("tsyringe");
const opportunity_services_1 = require("../services/opportunity.services");
const validateToken_middleware_1 = require("../middlewares/validateToken.middleware");
const isOpportunityOwner_middleware_1 = require("../middlewares/isOpportunityOwner.middleware");
tsyringe_1.container.registerSingleton("OpportunityServices", opportunity_services_1.OpportunityServices);
const opportunityController = tsyringe_1.container.resolve(opportunity_controllers_1.OpportunityController);
exports.opportunityRouter = (0, express_1.Router)();
exports.opportunityRouter.use("/:id", IsOpportunityIDValid_middlewares_1.IsOpportunityIDValid.execute);
exports.opportunityRouter.get("/", (req, res) => opportunityController.findMany(req, res));
exports.opportunityRouter.get("/users", validateToken_middleware_1.ValidyToken.execute, isOpportunityOwner_middleware_1.isOpportunityOwner.execute, (req, res) => opportunityController.findMany(req, res));
exports.opportunityRouter.get("/:id", validateToken_middleware_1.ValidyToken.execute, (req, res) => opportunityController.findOne(req, res));
exports.opportunityRouter.post("/", validateBody_middlewares_1.ValidateBody.execute(opportunity_schemas_1.opportunityCreateSchema), validateToken_middleware_1.ValidyToken.execute, (req, res) => opportunityController.create(req, res));
exports.opportunityRouter.patch("/:id", validateBody_middlewares_1.ValidateBody.execute(opportunity_schemas_1.opportunityUpdateSchema), isOpportunityOwner_middleware_1.isOpportunityOwner.execute, (req, res) => opportunityController.update(req, res));
exports.opportunityRouter.delete("/:id", validateToken_middleware_1.ValidyToken.execute, isOpportunityOwner_middleware_1.isOpportunityOwner.execute, (req, res) => opportunityController.delete(req, res));
exports.opportunityRouter.use("/", application_routes_1.applicationRouter);