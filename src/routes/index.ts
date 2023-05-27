import { Router } from "express";
import userRoute from "./user.route";
import configRoute from "./config.route";
import characterRoute from "./character.routes";

const routes = Router();

routes.use("/user", userRoute);
routes.use("/config", configRoute);
routes.use("/character", characterRoute);

export default routes;