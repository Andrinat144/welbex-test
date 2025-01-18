import { Router } from 'express';

import { BlogController } from '@/controllers/blog.controller';
import { Route } from '@/interfaces/Route.interface';
import { checkUser } from '@/middlewares/checkUser';
import upload from '@/middlewares/multer';

export class BlogRoute implements Route {
  public path = '/blog';
  public router = Router();

  private controller: BlogController;
  constructor() {
    this.controller = new BlogController();
    this.init();
  }
  private init() {
    this.router.post('/add', checkUser, upload.single('media'), this.controller.addNewBlog);
  }
}
