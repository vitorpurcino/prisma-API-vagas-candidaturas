import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import { opportunityRouter } from "./routes/opportunity.routes";
import { userRoutes } from "./routes/users.routes";
import { HandleErrors } from "./middlewares/handleErrors.middlewares";

export const app = express();

app.use(helmet());
app.use(json());
app.use(cors())
app.use("/opportunities", opportunityRouter);
app.use("/users", userRoutes)
app.use(HandleErrors.execute)
