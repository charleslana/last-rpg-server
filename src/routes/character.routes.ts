import express from "express";
import { characterCreateMiddleware, characterUpdateMiddleware } from "../middleware/celebrate/character.celebrate";
import authenticateMiddleware from "../middleware/authenticate.middleware";
import roleMiddleware from "../middleware/role.middleware";
import UserRoleEnum from "../enum/user.role.enum";
import CharacterController from "../controller/character.controller";
import { idParamMiddleware } from "../middleware/celebrate/common.celebrate";

const characterRoute = express.Router();

characterRoute
    .route("/")
    .post(
        characterCreateMiddleware(),
        authenticateMiddleware,
        roleMiddleware([UserRoleEnum.Admin]),
        CharacterController.create
    );

characterRoute
    .route("/")
    .get(authenticateMiddleware, CharacterController.findAll);

characterRoute
    .route("/:id")
    .get(idParamMiddleware(), authenticateMiddleware, CharacterController.findOne);

characterRoute
    .route("/")
    .put(
        characterUpdateMiddleware(),
        authenticateMiddleware,
        roleMiddleware([UserRoleEnum.Admin]),
        CharacterController.update
    );

characterRoute
    .route("/:id")
    .delete(
        idParamMiddleware(),
        authenticateMiddleware,
        roleMiddleware([UserRoleEnum.Admin]),
        CharacterController.delete
    );

export default characterRoute;