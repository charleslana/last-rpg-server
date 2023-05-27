import express from "express";
import { userLoginMiddleware, userCreateMiddleware } from "../middleware/celebrate/user.celebrate";
import UserController from "../controller/user.controller";
import authenticateMiddleware from "../middleware/authenticate.middleware";

const userRoute = express.Router();

userRoute.route("/").post(userCreateMiddleware(), UserController.create);

userRoute.route("/").get(authenticateMiddleware, UserController.find);

userRoute.route("/login").post(userLoginMiddleware(), UserController.login);

export default userRoute;