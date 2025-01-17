import { Router } from 'express';

import { UserController } from '@/controllers/user.controller';
import { Route } from '@/interfaces/Route.interface';
import { checkUser } from '@/middlewares/checkUser';

export class UserRoute implements Route {
  public path = '/auth';
  public router = Router();

  private controller: UserController;
  constructor() {
    this.controller = new UserController();
    this.init();
  }
  private init() {
    this.router.post('/sign-in', this.controller.signIn);
    this.router.post('/sign-up', checkUser, this.controller.signUp);
    this.router.delete('/sign-out', checkUser, this.controller.signOut);
    this.router.post('/refresh', this.controller.refreshToken);
  }
}
