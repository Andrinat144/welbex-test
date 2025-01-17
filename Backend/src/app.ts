import 'reflect-metadata';

import express from 'express';
import { Application, RequestHandler } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { AppDataSource } from '@/config/appDataSource';

import { AppInit } from './interfaces/AppInit.interface';
import { Route } from './interfaces/Route.interface';

class App {
  public app: Application;
  public port: number;
  constructor(appInit: AppInit) {
    this.app = express();
    this.port = appInit.port;

    this.initAssets();
    this.initMiddlewares(appInit.middlewares);
    this.initRoutes(appInit.routes);
    this.initSwagger();
  }
  private initMiddlewares(middlewares: RequestHandler[]) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }
  private initRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }
  private initSwagger() {
    const swaggerDocument = YAML.load('./swagger.yaml');
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
  private initAssets() {
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }
  public async listen() {
    await AppDataSource.initialize();
    this.app.listen(this.port, () => {
      console.log(`App listening  on the http://localhost:${this.port}`);
      process.on('exit', AppDataSource.destroy);
    });
  }
}

export default App;
