import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const server = async () => {
  await initMongoConnection();
  setupServer();
};

server();
