import cors from 'cors';
import pinoHTTP from 'pino-http';
import express from 'express';

export const setupServer = () => {
  const PORT = 3000;

  const app = express();

  app.use(
    cors({
      origin: `http://localhost:${PORT}`,
      optionsSuccessStatus: 200,
    }),
  );

  const pino = pinoHTTP({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(pino);

  app.use(express.json());

  app.get('/contacts', (req, res) => {
    res.json({
      message: `Server is running on port ${PORT} middleware message`,
    });
  });

  app.use((req, res, next) => {
    res.status(404).send({ status: 404, message: 'Page not found :(' });
  });

  app.use((req, res, next, error) => {
    console.error(error);
    res.status(500).send({ status: 500, message: 'Internal server Error!' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
