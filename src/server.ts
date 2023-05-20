import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errors } from "celebrate";
import { database } from "./database/database";
import CronJobService from "./service/cronjob.service";
import HandlerSuccess from "./handler/handler.success";
import logger from "./utils/logger";
import routes from "./routes";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 5 minutes',
}));

app.use(routes);

app.use(errors());

app.use(errorMiddleware);

app.use((request: Request, response: Response) => {
    logger.info(`Route ${request.url} not found`);
    return new HandlerSuccess('Rota não encontrada', 404).toJSON(response);
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    await database.sync();
    CronJobService.start();
    console.log(`Started on port ${port}`);
});