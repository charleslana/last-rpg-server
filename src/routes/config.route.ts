import express from "express";
import ConfigController from "../controller/config.controller";

const configRoute = express.Router();

configRoute.route("/version").get(ConfigController.getServerVersion);

export default configRoute;