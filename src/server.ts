import cors from 'cors';
import CronJobService from './service/cronjobService';
import errorMiddleware from './middleware/errorMiddleware';
import express, { Request, Response } from 'express';
import HandlerSuccess from './handler/handlerSuccess';
import helmet from 'helmet';
import logger from './utils/logger';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { database } from './database/database';
import { errors } from 'celebrate';

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 5 minutes',
  })
);

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
