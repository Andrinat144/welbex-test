import cookieParser from 'cookie-parser';
import cors from 'cors';

import App from './app';
import logger from './src//middlewares/logger';
import config from './src/config';

const app = new App({
  port: config.PORT,
  middlewares: [
    logger(),
    cors({
      credentials: true,
      origin: ['http://localhost:5173', 'http://0.0.0.0', 'http://backend', 'http://localhost', 'http://161.35.202.56'],
    }),
    cookieParser(),
  ],
  routes: [new UserRoute()],
});

app.listen();
