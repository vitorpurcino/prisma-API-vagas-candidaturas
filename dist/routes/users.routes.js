"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const user_services_1 = require("../services/user.services");
const user_controllers_1 = require("../controllers/user.controllers");
const validateBody_middlewares_1 = require("../middlewares/validateBody.middlewares");
const user_schema_1 = require("../schemas/user.schema");
const validateToken_middleware_1 = require("../middlewares/validateToken.middleware");
const isEmailUnique_middleware_1 = require("../middlewares/isEmailUnique.middleware");
const UserLogin_middleware_1 = require("../middlewares/UserLogin.middleware");
tsyringe_1.container.registerSingleton("UserServices", user_services_1.UserServices);
const userControllers = tsyringe_1.container.resolve(user_controllers_1.UserControllers);
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.post("/", validateBody_middlewares_1.ValidateBody.execute(user_schema_1.userRegisterBodySchema), isEmailUnique_middleware_1.IsEmailUnique.execute, (req, res) => {
    userControllers.register(req, res);
});
exports.userRoutes.post("/login", validateBody_middlewares_1.ValidateBody.execute(user_schema_1.userLoginBodySchema), UserLogin_middleware_1.UserLogin.execute, (req, res) => {
    userControllers.login(req, res);
});
exports.userRoutes.get("/", validateToken_middleware_1.ValidyToken.execute, (req, res) => {
    userControllers.getUser(req, res);
});
