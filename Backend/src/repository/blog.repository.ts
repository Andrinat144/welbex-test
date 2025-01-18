import { Repository } from 'typeorm';

import { AppDataSource } from '@/config/appDataSource';
import { BlogDto } from '@/dto/blog.dto';
import { Blog } from '@/entities/blog.entity';
import { User } from '@/entities/user.entity';

export class BlogRepository extends Repository<Blog> {
  constructor() {
    super(Blog, AppDataSource.createEntityManager());
  }

  async addNewBlog(body: BlogDto) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: body.userId } });
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const blog = new Blog();
    blog.user = user;
    blog.date = body.date;
    if (body.text) blog.text = body.text;
    if (body.media) blog.media = body.media;
    const saveBlog = await this.save(blog);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user: _, ...response } = saveBlog;
    return response;
  }
}
