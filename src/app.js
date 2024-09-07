import path from 'node:path';
import 'dotenv/config';
import cors from 'cors';
import pinoHTTP from 'pino-http';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouters from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import { authenticate } from './middlewares/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

app.use('/avatars', express.static(path.resolve('src', 'public/avatars')));

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }),
);

const pino = pinoHTTP({
  transport: {
    target: 'pino-pretty',
  },
});

app.use(pino);

app.use('/auth', authRouters);

app.use('/contacts', authenticate, contactsRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
