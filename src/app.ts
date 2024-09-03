import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';
import globalErroHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173/',
    credentials: true,
  })
);

// application routes
app.use('/api/v1', router);
app.use(globalErroHandler);
// not found
app.use(notFound);

export default app;
