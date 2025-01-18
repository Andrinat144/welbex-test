import cookieParser from 'cookie-parser';
import cors from 'cors';

import App from '@/app';
import { BlogRoute } from '@/routes/blog.route';
import { UserRoute } from '@/routes/user.route';

import config from './config';
import logger from './middlewares/logger';

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
  routes: [new UserRoute(), new BlogRoute()],
});

app.listen();
