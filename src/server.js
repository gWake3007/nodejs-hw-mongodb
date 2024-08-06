import 'dotenv/config';
import app from './app.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const server = async () => {
  try {
    await initMongoConnection();

    const PORT = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
