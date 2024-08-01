import 'dotenv/config';
import cors from 'cors';
import pinoHTTP from 'pino-http';
import express from 'express';
import { Contact } from './modals/contacts.js';

export const setupServer = () => {
  const app = express();

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

  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();

      res.send({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error!' });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;

      const contact = await Contact.findById(contactId);
      if (contact === null) {
        res.status(404).send({ status: 404, message: 'Contact not found' });
      }
      res.send({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.use((req, res, next) => {
    res.status(404).send({ status: 404, message: 'Page not found :(' });
  });

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
