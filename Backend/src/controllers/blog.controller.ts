import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler } from 'express';

import { BlogDto } from '@/dto/blog.dto';
import { RequestWithUser } from '@/middlewares/checkUser';
import { BlogService } from '@/services/blog.service';

export class BlogController {
  private service: BlogService;
  constructor() {
    this.service = new BlogService();
  }

  getAll: RequestHandler = async (req, res): Promise<void> => {
    const blogs = await this.service.getAll();
    res.send(blogs);
  };

  addNewBlog: RequestHandler = async (req: RequestWithUser, res) => {
    try {
      const userId = req.user?.id;
      if (userId === undefined) {
        res.status(401).send({ error: { message: 'Пользователь не авторизован' } });
        return;
      }
      const blogDto = plainToInstance(BlogDto, { ...req.body, date: new Date(), userID: userId });
      const errors = await validate(blogDto);
      if (errors.length > 0) {
        res.status(400).send({ error: errors.map((err) => err.constraints) });
        return;
      }
      if (req.file) blogDto.media = req.file.filename;

      const blog = await this.service.addNewBlog(blogDto);
      res.send(blog);
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).send({ error: { message: e.message } });
        return;
      }
      res.status(500).send({ error: { message: 'Oops something went wrong' } });
    }
  };
}
